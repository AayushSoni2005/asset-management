package com.aayush.assetmanagement.dashboard.service.impl;

import com.aayush.assetmanagement.dashboard.dto.DashboardSummaryResponse;
import com.aayush.assetmanagement.dashboard.service.DashboardService;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.user.enums.Role;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final EquipmentRepository equipmentRepository;
    private final IssueRepository issueRepository;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        return DashboardSummaryResponse.builder()

                .totalEmployees(
                        employeeRepository.count()
                )

                .totalTechnicians(
                        employeeRepository.countByRole(Role.TECHNICIAN)
                )

                .totalEquipment(
                        equipmentRepository.count()
                )

                .assignedEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.ASSIGNED
                        )
                )

                .availableEquipment(
                        equipmentRepository.countByStatus(
                                EquipmentStatus.AVAILABLE
                        )
                )

                .totalIssues(
                        issueRepository.count()
                )

                .openIssues(
                        issueRepository.countByStatus(
                                IssueStatus.OPEN
                        )
                )

                .inProgressIssues(
                        issueRepository.countByStatus(
                                IssueStatus.IN_PROGRESS
                        )
                )

                .resolvedIssues(
                        issueRepository.countByStatus(
                                IssueStatus.RESOLVED
                        )
                )

                .closedIssues(
                        issueRepository.countByStatus(
                                IssueStatus.CLOSED
                        )
                )

                .totalWorkOrders(
                        workOrderRepository.count()
                )

                .pendingWorkOrders(
                        workOrderRepository.countByStatus(
                                WorkOrderStatus.PENDING
                        )
                )

                .assignedWorkOrders(
                        workOrderRepository.countByStatus(
                                WorkOrderStatus.ASSIGNED
                        )
                )

                .inProgressWorkOrders(
                        workOrderRepository.countByStatus(
                                WorkOrderStatus.IN_PROGRESS
                        )
                )

                .completedWorkOrders(
                        workOrderRepository.countByStatus(
                                WorkOrderStatus.COMPLETED
                        )
                )

                .cancelledWorkOrders(
                        workOrderRepository.countByStatus(
                                WorkOrderStatus.CANCELLED
                        )
                )

                .build();
    }
}