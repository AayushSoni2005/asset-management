package com.aayush.assetmanagement.equipment.service.impl;

import com.aayush.assetmanagement.analytics.dto.ChartDataResponse;
import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.equipment.dto.EquipmentRequest;
import com.aayush.assetmanagement.equipment.dto.EquipmentResponse;
import com.aayush.assetmanagement.equipment.entity.Equipment;
import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import com.aayush.assetmanagement.equipment.mapper.EquipmentMapper;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.equipment.service.EquipmentService;
import com.aayush.assetmanagement.exception.DuplicateResourceException;
import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EmployeeRepository employeeRepository;
    private final EquipmentMapper equipmentMapper;
    private final IssueRepository issueRepository;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public EquipmentResponse createEquipment(EquipmentRequest request) {

        validateUniqueFields(request);

        Equipment equipment = equipmentMapper.toEntity(request);

        assignEmployee(equipment, request);

        Equipment savedEquipment = equipmentRepository.save(equipment);

        return equipmentMapper.toResponse(savedEquipment);
    }

    @Override
    @Transactional(readOnly = true)
    public EquipmentResponse getEquipmentById(Long id) {

        return equipmentMapper.toResponse(getEquipment(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EquipmentResponse> getAllEquipment() {

        return equipmentRepository.findAll()
                .stream()
                .map(equipmentMapper::toResponse)
                .toList();
    }

    @Override
    public EquipmentResponse updateEquipment(Long id, EquipmentRequest request) {

        Equipment equipment = getEquipment(id);

        validateUniqueFieldsForUpdate(equipment, request);

        equipmentMapper.updateEquipmentFromRequest(request, equipment);

        assignEmployee(equipment, request);

        Equipment updatedEquipment = equipmentRepository.save(equipment);

        return equipmentMapper.toResponse(updatedEquipment);
    }

    @Override
    public void deleteEquipment(Long id) {

        Equipment equipment = getEquipment(id);

        List<Issue> issues = issueRepository.findByEquipmentId(id);

        for (Issue issue : issues) {
            workOrderRepository.deleteAll(
                    workOrderRepository.findByIssueId(issue.getId())
            );
        }

        issueRepository.deleteAll(issues);

        equipmentRepository.delete(equipment);
    }

    private Equipment getEquipment(Long id) {

        return equipmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipment not found with id: " + id));
    }

    private void validateUniqueFields(EquipmentRequest request) {

        if (equipmentRepository.existsByAssetTag(request.getAssetTag())) {
            throw new DuplicateResourceException("Asset tag already exists.");
        }

        if (equipmentRepository.existsBySerialNumber(request.getSerialNumber())) {
            throw new DuplicateResourceException("Serial number already exists.");
        }
    }

    private void validateUniqueFieldsForUpdate(
            Equipment equipment,
            EquipmentRequest request
    ) {

        if (!equipment.getAssetTag().equals(request.getAssetTag())
                && equipmentRepository.existsByAssetTag(request.getAssetTag())) {

            throw new DuplicateResourceException("Asset tag already exists.");
        }

        if (!equipment.getSerialNumber().equals(request.getSerialNumber())
                && equipmentRepository.existsBySerialNumber(request.getSerialNumber())) {

            throw new DuplicateResourceException("Serial number already exists.");
        }
    }

    private void assignEmployee(
            Equipment equipment,
            EquipmentRequest request
    ) {

        equipment.setStatus(request.getStatus());

        if (request.getStatus() == EquipmentStatus.ASSIGNED) {

            if (request.getAssignedToEmployeeId() == null) {
                throw new ResourceNotFoundException(
                        "Assigned employee id is required.");
            }

            Employee employee = employeeRepository.findById(
                            request.getAssignedToEmployeeId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Employee not found with id: "
                                            + request.getAssignedToEmployeeId()));

            equipment.setAssignedTo(employee);

        } else {

            equipment.setAssignedTo(null);
        }
    }

    @Override
    public List<ChartDataResponse> getEquipmentCategoryAnalytics() {

        return equipmentRepository.countEquipmentByCategory()
                .stream()
                .map(result -> ChartDataResponse.builder()
                        .label(result[0].toString())
                        .value((Long) result[1])
                        .build())
                .toList();
    }

}