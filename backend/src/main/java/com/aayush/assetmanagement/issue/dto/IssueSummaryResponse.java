package com.aayush.assetmanagement.issue.dto;

import com.aayush.assetmanagement.issue.enums.IssuePriority;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
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
public class IssueSummaryResponse {

    private Long id;

    private String issueNumber;

    private String title;

    private IssuePriority priority;

    private IssueStatus status;

}