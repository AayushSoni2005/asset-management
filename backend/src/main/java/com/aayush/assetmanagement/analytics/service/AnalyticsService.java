package com.aayush.assetmanagement.analytics.service;

import com.aayush.assetmanagement.analytics.dto.ChartDataResponse;

import java.util.List;

public interface AnalyticsService {

    List<ChartDataResponse> getIssueStatusAnalytics();

    List<ChartDataResponse> getWorkOrderStatusAnalytics();

    List<ChartDataResponse> getEquipmentStatusAnalytics();

    List<ChartDataResponse> getMonthlyIssueAnalytics();
    
    List<ChartDataResponse> getIssuePriorityAnalytics();
    
    List<ChartDataResponse> getEquipmentCategoryAnalytics();
    
    List<ChartDataResponse> getMonthlyWorkOrderAnalytics();
    
    List<ChartDataResponse> getDepartmentAnalytics();

}