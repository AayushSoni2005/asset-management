package com.aayush.assetmanagement.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeReportResponse {

    private long totalEmployees;

    private long activeEmployees;

    private long inactiveEmployees;

    private long adminCount;

    private long technicianCount;

    private long employeeCount;

}