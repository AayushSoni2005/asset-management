package com.aayush.assetmanagement.report.service;

import com.aayush.assetmanagement.report.dto.response.EmployeeReportResponse;
import com.aayush.assetmanagement.report.dto.response.EquipmentReportResponse;
import com.aayush.assetmanagement.report.dto.response.IssueReportResponse;
import com.aayush.assetmanagement.report.dto.response.WorkOrderReportResponse;

public interface ReportService {

    /**
     * Generates equipment report based on the logged-in user's role.
     *
     * ADMIN      -> All equipment
     * TECHNICIAN -> Equipment relevant to technician
     * EMPLOYEE   -> Equipment assigned to employee
     */
    EquipmentReportResponse getEquipmentReport();

    /**
     * Generates issue report based on the logged-in user's role.
     *
     * ADMIN      -> All issues
     * TECHNICIAN -> Assigned issues
     * EMPLOYEE   -> Reported issues
     */
    IssueReportResponse getIssueReport();

    /**
     * Generates work order report.
     *
     * Accessible to ADMIN and TECHNICIAN only.
     */
    WorkOrderReportResponse getWorkOrderReport();

    /**
     * Generates employee report.
     *
     * Accessible to ADMIN only.
     */
    EmployeeReportResponse getEmployeeReport();

}