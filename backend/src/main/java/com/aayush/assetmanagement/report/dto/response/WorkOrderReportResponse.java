package com.aayush.assetmanagement.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderReportResponse {

    private long totalWorkOrders;

    private long pendingWorkOrders;

    private long assignedWorkOrders;

    private long inProgressWorkOrders;

    private long completedWorkOrders;

}