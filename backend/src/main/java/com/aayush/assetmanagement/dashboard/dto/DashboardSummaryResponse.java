package com.aayush.assetmanagement.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {

    private long totalEmployees;

    private long totalTechnicians;

    private long totalEquipment;

    private long assignedEquipment;

    private long availableEquipment;

    private long totalIssues;

    private long openIssues;

    private long inProgressIssues;

    private long resolvedIssues;

    private long closedIssues;

    private long totalWorkOrders;

    private long pendingWorkOrders;

    private long assignedWorkOrders;

    private long inProgressWorkOrders;

    private long completedWorkOrders;

    private long cancelledWorkOrders;

}