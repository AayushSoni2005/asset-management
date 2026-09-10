package com.aayush.assetmanagement.issue.dto;

import com.aayush.assetmanagement.issue.enums.IssuePriority;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import java.time.LocalDateTime;
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
public class IssueResponse {

    private Long id;

    private String issueNumber;

    private EquipmentSummaryResponse equipment;

    private EmployeeSummaryResponse reportedBy;

    private EmployeeSummaryResponse assignedTo;

    private String title;

    private String description;

    private IssuePriority priority;

    private IssueStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
    
    private LocalDateTime assignedAt;
    private LocalDateTime resolvedAt;

}