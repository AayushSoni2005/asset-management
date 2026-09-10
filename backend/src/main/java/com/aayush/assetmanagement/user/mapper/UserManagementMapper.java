package com.aayush.assetmanagement.user.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import com.aayush.assetmanagement.user.dto.UserRequest;
import com.aayush.assetmanagement.user.dto.UserResponse;
import com.aayush.assetmanagement.user.entity.User;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserManagementMapper {

    User toEntity(UserRequest request);

    UserResponse toResponse(User user);

    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
    )
    void updateEntityFromRequest(
            UserRequest request,
            @MappingTarget User user
    );

}