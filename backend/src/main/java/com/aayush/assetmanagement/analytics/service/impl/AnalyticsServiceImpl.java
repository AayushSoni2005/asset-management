package com.aayush.assetmanagement.analytics.service.impl;

import com.aayush.assetmanagement.analytics.dto.ChartDataResponse;
import com.aayush.assetmanagement.analytics.service.AnalyticsService;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import com.aayush.assetmanagement.equipment.repository.EquipmentRepository;
import com.aayush.assetmanagement.issue.enums.IssuePriority;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import com.aayush.assetmanagement.issue.repository.IssueRepository;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import com.aayush.assetmanagement.workorder.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private final IssueRepository issueRepository;
    private final WorkOrderRepository workOrderRepository;
    private final EquipmentRepository equipmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<ChartDataResponse> getIssueStatusAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (IssueStatus status : IssueStatus.values()) {
            response.add(
                    ChartDataResponse.builder()
                            .label(status.name())
                            .value(issueRepository.countByStatus(status))
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<ChartDataResponse> getWorkOrderStatusAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (WorkOrderStatus status : WorkOrderStatus.values()) {
            response.add(
            		ChartDataResponse.builder()
                            .label(status.name())
                            .value(workOrderRepository.countByStatus(status))
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<ChartDataResponse> getEquipmentStatusAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (EquipmentStatus status : EquipmentStatus.values()) {

            response.add(
                    ChartDataResponse.builder()
                            .label(status.name())
                            .value(equipmentRepository.countByStatus(status))
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<ChartDataResponse> getMonthlyIssueAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            Month currentMonth = Month.of(month);

            response.add(
                    ChartDataResponse.builder()
                            .label(currentMonth.getDisplayName(TextStyle.SHORT, Locale.ENGLISH))
                            .value(issueRepository.countByCreatedMonth(month))
                            .build()
            );
        }

        return response;
    }
    
    @Override
    public List<ChartDataResponse> getIssuePriorityAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (IssuePriority priority : IssuePriority.values()) {

            response.add(
                    ChartDataResponse.builder()
                            .label(priority.name())
                            .value(issueRepository.countByPriority(priority))
                            .build()
            );
        }

        return response;
    }
    
    @Override
    public List<ChartDataResponse> getEquipmentCategoryAnalytics() {

        return equipmentRepository
                .countEquipmentByCategory()
                .stream()
                .map(result ->
                        ChartDataResponse.builder()
                                .label((String) result[0])
                                .value((Long) result[1])
                                .build()
                )
                .toList();
    }
    
    @Override
    public List<ChartDataResponse> getMonthlyWorkOrderAnalytics() {

        List<ChartDataResponse> response = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            Month currentMonth = Month.of(month);

            response.add(
                    ChartDataResponse.builder()
                            .label(currentMonth.getDisplayName(
                                    TextStyle.SHORT,
                                    Locale.ENGLISH
                            ))
                            .value(workOrderRepository.countByCreatedMonth(month))
                            .build()
            );
        }

        return response;
    }
    
    @Override
    public List<ChartDataResponse> getDepartmentAnalytics() {

        return employeeRepository
                .countEmployeesByDepartment()
                .stream()
                .map(result ->
                        ChartDataResponse.builder()
                                .label((String) result[0])
                                .value((Long) result[1])
                                .build()
                )
                .toList();
    }

}