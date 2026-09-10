package com.aayush.assetmanagement.workorder.mapper;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.issue.dto.EmployeeSummaryResponse;
import com.aayush.assetmanagement.issue.dto.IssueSummaryResponse;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.workorder.dto.WorkOrderRequest;
import com.aayush.assetmanagement.workorder.dto.WorkOrderResponse;
import com.aayush.assetmanagement.workorder.entity.WorkOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface WorkOrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workOrderNumber", ignore = true)
    @Mapping(target = "issue", ignore = true)
    @Mapping(target = "technician", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assignedAt", ignore = true)
    @Mapping(target = "completedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    WorkOrder toEntity(WorkOrderRequest request);

    @Mapping(target = "issue", source = "issue")
    @Mapping(target = "technician", source = "technician")
    WorkOrderResponse toResponse(WorkOrder workOrder);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "issueNumber", source = "issueNumber")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "priority", source = "priority")
    @Mapping(target = "status", source = "status")
    IssueSummaryResponse toIssueSummaryResponse(Issue issue);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "employeeId", source = "employeeCode")
    @Mapping(target = "fullName",
            expression = "java(employee.getFullName())")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    @Mapping(target = "department", source = "department")
    @Mapping(target = "designation", source = "designation")
    EmployeeSummaryResponse toEmployeeSummaryResponse(Employee employee);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workOrderNumber", ignore = true)
    @Mapping(target = "issue", ignore = true)
    @Mapping(target = "technician", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assignedAt", ignore = true)
    @Mapping(target = "completedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateWorkOrderFromRequest(
            WorkOrderRequest request,
            @MappingTarget WorkOrder workOrder
    );
}