package com.aayush.assetmanagement.analytics.controller;

import com.aayush.assetmanagement.analytics.dto.ChartDataResponse;
import com.aayush.assetmanagement.analytics.service.AnalyticsService;
import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/issues/status")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getIssueStatusAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Issue status analytics retrieved successfully",
                        analyticsService.getIssueStatusAnalytics()
                )
        );
    }

    @GetMapping("/equipment/status")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getEquipmentStatusAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Equipment status analytics retrieved successfully",
                        analyticsService.getEquipmentStatusAnalytics()
                )
        );
    }

    @GetMapping("/work-orders/status")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getWorkOrderStatusAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Work order status analytics retrieved successfully",
                        analyticsService.getWorkOrderStatusAnalytics()
                )
        );
    }

    @GetMapping("/issues/monthly")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getMonthlyIssueAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Monthly issue analytics retrieved successfully",
                        analyticsService.getMonthlyIssueAnalytics()
                )
        );
    }

    @GetMapping("/issues/priority")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getIssuePriorityAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Issue priority analytics retrieved successfully",
                        analyticsService.getIssuePriorityAnalytics()
                )
        );
    }

    @GetMapping("/equipment/category")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getEquipmentCategoryAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Equipment category analytics retrieved successfully",
                        analyticsService.getEquipmentCategoryAnalytics()
                )
        );
    }

    @GetMapping("/work-orders/monthly")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getMonthlyWorkOrderAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Monthly work order analytics retrieved successfully",
                        analyticsService.getMonthlyWorkOrderAnalytics()
                )
        );
    }

    @GetMapping("/departments")
    public ResponseEntity<ApiResponse<List<ChartDataResponse>>> getDepartmentAnalytics() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Department analytics retrieved successfully",
                        analyticsService.getDepartmentAnalytics()
                )
        );
    }
}