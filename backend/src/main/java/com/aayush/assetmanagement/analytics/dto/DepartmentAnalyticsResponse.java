package com.aayush.assetmanagement.analytics.dto;

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
public class DepartmentAnalyticsResponse {

    private String department;

    private Long employeeCount;

    private Long assignedEquipment;

    private Long reportedIssues;

    private Long workOrders;
}