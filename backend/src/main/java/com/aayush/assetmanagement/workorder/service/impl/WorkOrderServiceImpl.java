package com.aayush.assetmanagement.workorder.service.impl;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.exception.BadRequestException;
import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.user.enums.Role;
import com.aayush.assetmanagement.workorder.dto.WorkOrderRequest;
import com.aayush.assetmanagement.workorder.dto.WorkOrderResponse;
import com.aayush.assetmanagement.workorder.entity.WorkOrder;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import com.aayush.assetmanagement.workorder.mapper.WorkOrderMapper;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;
import com.aayush.assetmanagement.workorder.service.WorkOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final IssueRepository issueRepository;
    private final EmployeeRepository employeeRepository;
    private final WorkOrderMapper workOrderMapper;

    @Override
    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {

        if (workOrderRepository.existsByIssueId(request.getIssueId())) {
            throw new BadRequestException(
                    "A work order already exists for this issue."
            );
        }

        WorkOrder workOrder = workOrderMapper.toEntity(request);

        workOrder.setWorkOrderNumber(generateWorkOrderNumber());
        workOrder.setStatus(WorkOrderStatus.PENDING);
        workOrder.setAssignedAt(LocalDateTime.now());

        Issue issue = getIssue(request.getIssueId());

        validateIssueForWorkOrder(issue);

        workOrder.setIssue(issue);
        workOrder.setTechnician(getTechnician(request.getTechnicianId()));

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }
    private void validateIssueForWorkOrder(Issue issue) {

        if (issue.getStatus() == IssueStatus.RESOLVED) {
            throw new BadRequestException(
                    "Cannot create a work order for a resolved issue."
            );
        }
    }

    @Override
    @Transactional(readOnly = true)
    public WorkOrderResponse getWorkOrderById(Long id) {

        return workOrderMapper.toResponse(getWorkOrder(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(workOrderMapper::toResponse)
                .toList();
    }

    @Override
    public WorkOrderResponse updateWorkOrder(
            Long id,
            WorkOrderRequest request
    ) {

    	WorkOrder workOrder = getWorkOrder(id);

    	if ((workOrder.getStatus() == WorkOrderStatus.IN_PROGRESS
    	        || workOrder.getStatus() == WorkOrderStatus.COMPLETED)
    	        && !workOrder.getTechnician().getId().equals(request.getTechnicianId())) {

    	    throw new BadRequestException(
    	            "Technician cannot be changed after work has started."
    	    );
    	}

        workOrderMapper.updateWorkOrderFromRequest(
                request,
                workOrder
        );

        workOrder.setIssue(getIssue(request.getIssueId()));
        workOrder.setTechnician(
                getTechnician(request.getTechnicianId())
        );

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }

    @Override
    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        workOrderRepository.delete(workOrder);
    }

    @Override
    public WorkOrderResponse assignWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (workOrder.getStatus() != WorkOrderStatus.PENDING) {
            throw new BadRequestException(
                    "Only pending work orders can be assigned."
            );
        }

        workOrder.setStatus(WorkOrderStatus.ASSIGNED);
        workOrder.setAssignedAt(LocalDateTime.now());

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }

    @Override
    public WorkOrderResponse startWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (workOrder.getStatus() != WorkOrderStatus.ASSIGNED) {
            throw new BadRequestException(
                    "Only assigned work orders can be started."
            );
        }

        workOrder.setStatus(WorkOrderStatus.IN_PROGRESS);

        Issue issue = workOrder.getIssue();
        issue.setStatus(IssueStatus.IN_PROGRESS);

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }

    @Override
    public WorkOrderResponse completeWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (workOrder.getStatus() != WorkOrderStatus.IN_PROGRESS) {
            throw new BadRequestException(
                    "Only work orders in progress can be completed."
            );
        }

        workOrder.setStatus(WorkOrderStatus.COMPLETED);
        workOrder.setCompletedAt(LocalDateTime.now());

        Issue issue = workOrder.getIssue();
        issue.setStatus(IssueStatus.RESOLVED);

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }

    @Override
    public WorkOrderResponse cancelWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (workOrder.getStatus() != WorkOrderStatus.PENDING
                && workOrder.getStatus() != WorkOrderStatus.ASSIGNED) {

            throw new BadRequestException(
                    "Only pending or assigned work orders can be cancelled."
            );
        }

        workOrder.setStatus(WorkOrderStatus.CANCELLED);

        return workOrderMapper.toResponse(
                workOrderRepository.save(workOrder)
        );
    }

    private WorkOrder getWorkOrder(Long id) {

        return workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found with id: " + id
                        ));
    }

    private Issue getIssue(Long id) {

        return issueRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Issue not found with id: " + id
                        ));
    }

    private Employee getTechnician(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id
                        ));

        if (employee.getUser() == null
                || employee.getUser().getRole() != Role.TECHNICIAN) {

            throw new BadRequestException(
                    "Selected employee is not a technician."
            );
        }

        return employee;
    }

    private String generateWorkOrderNumber() {

        String date = LocalDate.now()
                .format(DateTimeFormatter.BASIC_ISO_DATE);

        long count = workOrderRepository.count() + 1;

        return String.format(
                "WO-%s-%04d",
                date,
                count
        );
    }
}