package com.aayush.assetmanagement.user.mapper;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.user.dto.ProfileResponse;
import com.aayush.assetmanagement.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ProfileMapper {

    @Mapping(target = "employeeId", source = "employeeCode")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    @Mapping(target = "enabled", source = "user.enabled")
    @Mapping(target = "hasEmployeeProfile", constant = "true")
    @Mapping(target = "profileMessage", ignore = true)
    ProfileResponse toResponse(Employee employee);

    @Mapping(target = "employeeId", ignore = true)
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "department", ignore = true)
    @Mapping(target = "designation", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)

    @Mapping(target = "enabled", source = "enabled")

    @Mapping(target = "hasEmployeeProfile", constant = "false")
    @Mapping(
            target = "profileMessage",
            constant = "No employee profile is associated with this account."
    )
    ProfileResponse toResponse(User user);
}