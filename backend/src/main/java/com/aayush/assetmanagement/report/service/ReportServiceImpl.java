package com.aayush.assetmanagement.report.service;

import com.aayush.assetmanagement.employee.enums.EmployeeStatus;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.report.dto.response.EmployeeReportResponse;
import com.aayush.assetmanagement.report.dto.response.EquipmentReportResponse;
import com.aayush.assetmanagement.report.dto.response.IssueReportResponse;
import com.aayush.assetmanagement.report.dto.response.WorkOrderReportResponse;
import com.aayush.assetmanagement.user.enums.Role;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final EmployeeRepository employeeRepository;
    private final EquipmentRepository equipmentRepository;
    private final IssueRepository issueRepository;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public EquipmentReportResponse getEquipmentReport() {

        return EquipmentReportResponse.builder()
                .totalEquipment(
                        equipmentRepository.count()
                )
                .availableEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.AVAILABLE
                        )
                )
                .assignedEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.ASSIGNED
                        )
                )
                .maintenanceEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.MAINTENANCE
                        )
                )
                .retiredEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.RETIRED
                        )
                )
                .lostEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.LOST
                        )
                )
                .damagedEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.DAMAGED
                        )
                )
                .build();
    }

    @Override
    public IssueReportResponse getIssueReport() {

        return IssueReportResponse.builder()
                .totalIssues(issueRepository.count())
                .openIssues(issueRepository.countByStatus(IssueStatus.OPEN))
                .inProgressIssues(issueRepository.countByStatus(IssueStatus.IN_PROGRESS))
                .resolvedIssues(issueRepository.countByStatus(IssueStatus.RESOLVED))
                .build();
    }

    @Override
    public WorkOrderReportResponse getWorkOrderReport() {

        return WorkOrderReportResponse.builder()
                .totalWorkOrders(workOrderRepository.count())
                .pendingWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.PENDING))
                .assignedWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.ASSIGNED))
                .inProgressWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.IN_PROGRESS))
                .completedWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.COMPLETED))
                .build();
    }

    @Override
    public EmployeeReportResponse getEmployeeReport() {

        return EmployeeReportResponse.builder()
                .totalEmployees(employeeRepository.count())
                .activeEmployees(employeeRepository.countByStatus(EmployeeStatus.ACTIVE))
                .inactiveEmployees(employeeRepository.countByStatus(EmployeeStatus.INACTIVE))
                .adminCount(employeeRepository.countByRole(Role.ADMIN))
                .technicianCount(employeeRepository.countByRole(Role.TECHNICIAN))
                .employeeCount(employeeRepository.countByRole(Role.EMPLOYEE))
                .build();
    }
}