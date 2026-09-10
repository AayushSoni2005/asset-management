package com.aayush.assetmanagement.employee.service.impl;

import com.aayush.assetmanagement.employee.dto.EmployeeRequest;
import com.aayush.assetmanagement.employee.dto.EmployeeResponse;
import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.mapper.EmployeeMapper;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.employee.service.EmployeeService;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.exception.BadRequestException;
import com.aayush.assetmanagement.exception.DuplicateResourceException;
import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.enums.Role;
import com.aayush.assetmanagement.user.repository.UserRepository;
import com.aayush.assetmanagement.workorder.entity.WorkOrder;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final EmployeeMapper employeeMapper;
    private final EquipmentRepository equipmentRepository;
    private final IssueRepository issueRepository;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(request.getEmployeeId())) {
            throw new DuplicateResourceException(
                    "Employee code already exists."
            );
        }

        User user = getUser(request.getUserId());

        if (employeeRepository.existsByUserId(user.getId())) {
            throw new DuplicateResourceException(
                    "Selected user is already linked to an employee."
            );
        }

        Employee employee = employeeMapper.toEntity(request);

        employee.setUser(user);

        Employee savedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(savedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(Long id) {

        return employeeMapper.toResponse(getEmployee(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toResponse)
                .toList();
    }

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request
    ) {

        Employee employee = getEmployee(id);

        if (!employee.getEmployeeCode().equals(request.getEmployeeId())
                && employeeRepository.existsByEmployeeCode(request.getEmployeeId())) {

            throw new DuplicateResourceException(
                    "Employee code already exists."
            );
        }

        if (!employee.getUser().getId().equals(request.getUserId())
                && employeeRepository.existsByUserId(request.getUserId())) {

            throw new DuplicateResourceException(
                    "Selected user is already linked to another employee."
            );
        }

        User user = getUser(request.getUserId());

        employeeMapper.updateEmployeeFromRequest(request, employee);

        employee.setUser(user);

        Employee updatedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = getEmployee(id);

        if (employee.getUser().getRole() == Role.ADMIN
                && userRepository.countByRole(Role.ADMIN) == 1) {

            throw new BadRequestException(
                    "The last administrator cannot be deleted."
            );
        }

        equipmentRepository.findByAssignedToId(employee.getId())
                .forEach(equipment -> equipment.setAssignedTo(null));

        List<Issue> reportedIssues =
                issueRepository.findByReportedById(employee.getId());

        for (Issue issue : reportedIssues) {
            workOrderRepository.deleteAll(
                    workOrderRepository.findByIssueId(issue.getId())
            );
        }

        issueRepository.deleteAll(reportedIssues);

        issueRepository.findByAssignedToId(employee.getId())
                .forEach(issue -> issue.setAssignedTo(null));

        List<WorkOrder> workOrders =
                workOrderRepository.findByTechnicianId(employee.getId());

        workOrderRepository.deleteAll(workOrders);
        
        User user = employee.getUser();

        if (user != null) {
            user.setEmployee(null);
        }

        employee.setUser(null);

        employeeRepository.delete(employee);
    }
    
    
    
    private Employee getEmployee(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id
                        ));
    }

    private User getUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id
                        ));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getTechnicians() {

        return employeeRepository.findByUserRole(Role.TECHNICIAN)
                .stream()
                .map(employeeMapper::toResponse)
                .toList();
    }
}