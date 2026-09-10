package com.aayush.assetmanagement.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueReportResponse {

    private long totalIssues;

    private long openIssues;

    private long inProgressIssues;

    private long resolvedIssues;

}