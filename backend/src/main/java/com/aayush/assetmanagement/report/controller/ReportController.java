package com.aayush.assetmanagement.report.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.report.dto.response.EmployeeReportResponse;
import com.aayush.assetmanagement.report.dto.response.EquipmentReportResponse;
import com.aayush.assetmanagement.report.dto.response.IssueReportResponse;
import com.aayush.assetmanagement.report.dto.response.WorkOrderReportResponse;
import com.aayush.assetmanagement.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/equipment")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ResponseEntity<ApiResponse<EquipmentReportResponse>> getEquipmentReport() {

        EquipmentReportResponse report = reportService.getEquipmentReport();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Equipment report generated successfully.",
                        report
                )
        );
    }

    @GetMapping("/issues")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ResponseEntity<ApiResponse<IssueReportResponse>> getIssueReport() {

        IssueReportResponse report = reportService.getIssueReport();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Issue report generated successfully.",
                        report
                )
        );
    }

    @GetMapping("/work-orders")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<ApiResponse<WorkOrderReportResponse>> getWorkOrderReport() {

        WorkOrderReportResponse report = reportService.getWorkOrderReport();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Work order report generated successfully.",
                        report
                )
        );
    }

    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeReportResponse>> getEmployeeReport() {

        EmployeeReportResponse report = reportService.getEmployeeReport();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Employee report generated successfully.",
                        report
                )
        );
    }

}