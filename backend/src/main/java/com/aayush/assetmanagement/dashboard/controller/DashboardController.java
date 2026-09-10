package com.aayush.assetmanagement.dashboard.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.dashboard.dto.DashboardSummaryResponse;
import com.aayush.assetmanagement.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getDashboardSummary() {

        DashboardSummaryResponse summary = dashboardService.getDashboardSummary();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Dashboard summary retrieved successfully",
                        summary
                )
        );
    }
}