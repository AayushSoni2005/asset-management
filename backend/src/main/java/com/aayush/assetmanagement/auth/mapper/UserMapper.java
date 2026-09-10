package com.aayush.assetmanagement.auth.mapper;

import com.aayush.assetmanagement.auth.dto.RegisterRequest;
import com.aayush.assetmanagement.auth.dto.UserResponse;
import com.aayush.assetmanagement.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "enabled", constant = "true")
    @Mapping(target = "accountNonExpired", constant = "true")
    @Mapping(target = "accountNonLocked", constant = "true")
    @Mapping(target = "credentialsNonExpired", constant = "true")
    User toEntity(RegisterRequest request);

    UserResponse toResponse(User user);

}