package com.aayush.assetmanagement.issue.mapper;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.equipment.entity.Equipment;
import com.aayush.assetmanagement.issue.dto.EmployeeSummaryResponse;
import com.aayush.assetmanagement.issue.dto.EquipmentSummaryResponse;
import com.aayush.assetmanagement.issue.dto.IssueRequest;
import com.aayush.assetmanagement.issue.dto.IssueResponse;
import com.aayush.assetmanagement.issue.entity.Issue;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface IssueMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "issueNumber", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "reportedBy", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Issue toEntity(IssueRequest request);

    IssueResponse toResponse(Issue issue);

    EquipmentSummaryResponse toEquipmentSummaryResponse(
            Equipment equipment
    );

    EmployeeSummaryResponse toEmployeeSummaryResponse(
            Employee employee
    );

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "issueNumber", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "reportedBy", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateIssueFromRequest(
            IssueRequest request,
            @MappingTarget Issue issue
    );

}