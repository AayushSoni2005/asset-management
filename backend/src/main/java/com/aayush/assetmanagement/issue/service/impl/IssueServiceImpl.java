package com.aayush.assetmanagement.issue.service.impl;

import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.equipment.entity.Equipment;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.issue.dto.IssueRequest;
import com.aayush.assetmanagement.issue.dto.IssueResponse;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import com.aayush.assetmanagement.issue.mapper.IssueMapper;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.issue.service.IssueService;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final EquipmentRepository equipmentRepository;
    private final EmployeeRepository employeeRepository;
    private final IssueMapper issueMapper;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public IssueResponse createIssue(IssueRequest request) {

        Issue issue = issueMapper.toEntity(request);

        issue.setIssueNumber(generateIssueNumber());
        issue.setStatus(IssueStatus.OPEN);

        assignRelations(issue, request);

        Issue savedIssue = issueRepository.save(issue);

        return issueMapper.toResponse(savedIssue);
    }

    @Override
    @Transactional(readOnly = true)
    public IssueResponse getIssueById(Long id) {

        return issueMapper.toResponse(getIssue(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<IssueResponse> getAllIssues() {

        return issueRepository.findAll()
                .stream()
                .map(issueMapper::toResponse)
                .toList();
    }

    @Override
    public IssueResponse updateIssue(Long id, IssueRequest request) {

        Issue issue = getIssue(id);

        issueMapper.updateIssueFromRequest(request, issue);

        assignRelations(issue, request);

        Issue updatedIssue = issueRepository.save(issue);

        return issueMapper.toResponse(updatedIssue);
    }

    @Override
    public void deleteIssue(Long id) {

        Issue issue = getIssue(id);

        workOrderRepository.deleteAll(
                workOrderRepository.findByIssueId(issue.getId())
        );

        issueRepository.delete(issue);
    }

    private Issue getIssue(Long id) {

        return issueRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Issue not found with id: " + id));
    }

    private void assignRelations(
            Issue issue,
            IssueRequest request
    ) {

        Equipment equipment = equipmentRepository.findById(
                        request.getEquipmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipment not found with id: "
                                        + request.getEquipmentId()));

        Employee reporter = employeeRepository.findById(
                        request.getReportedByEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: "
                                        + request.getReportedByEmployeeId()));

        issue.setEquipment(equipment);
        issue.setReportedBy(reporter);

        if (request.getAssignedToEmployeeId() != null) {

            Employee technician = employeeRepository.findById(
                            request.getAssignedToEmployeeId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Employee not found with id: "
                                            + request.getAssignedToEmployeeId()));

            issue.setAssignedTo(technician);

        } else {

            issue.setAssignedTo(null);
        }
    }

    private String generateIssueNumber() {

        String date = LocalDate.now()
                .format(DateTimeFormatter.BASIC_ISO_DATE);

        long count = issueRepository.count() + 1;

        return String.format(
                "ISS-%s-%04d",
                date,
                count
        );
    }

}