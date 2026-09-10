package com.aayush.assetmanagement.employee.mapper;

import com.aayush.assetmanagement.employee.dto.EmployeeRequest;
import com.aayush.assetmanagement.employee.dto.EmployeeResponse;
import com.aayush.assetmanagement.employee.entity.Employee;
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
public interface EmployeeMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "employeeCode", source = "employeeId")
    Employee toEntity(EmployeeRequest request);

    @Mapping(target = "employeeId", source = "employeeCode")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    @Mapping(target = "enabled", source = "user.enabled")
    @Mapping(target = "fullName", expression = "java(employee.getFullName())")
    EmployeeResponse toResponse(Employee employee);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "employeeCode", source = "employeeId")
    void updateEmployeeFromRequest(
            EmployeeRequest request,
            @MappingTarget Employee employee
    );
}