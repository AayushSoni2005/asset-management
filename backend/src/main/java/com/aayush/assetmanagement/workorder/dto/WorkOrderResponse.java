package com.aayush.assetmanagement.workorder.dto;

import com.aayush.assetmanagement.issue.dto.EmployeeSummaryResponse;
import com.aayush.assetmanagement.issue.dto.IssueSummaryResponse;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderResponse {

    private Long id;

    private String workOrderNumber;

    private IssueSummaryResponse issue;

    private EmployeeSummaryResponse technician;

    private String title;

    private String repairNotes;

    private WorkOrderStatus status;

    private LocalDateTime assignedAt;

    private LocalDateTime completedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}