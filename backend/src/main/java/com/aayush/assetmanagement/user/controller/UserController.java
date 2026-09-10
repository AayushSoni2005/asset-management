package com.aayush.assetmanagement.user.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.user.dto.ChangePasswordRequest;
import com.aayush.assetmanagement.user.dto.ProfileResponse;
import com.aayush.assetmanagement.user.dto.UpdateProfileRequest;
import com.aayush.assetmanagement.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ProfileResponse>> getCurrentUser() {

        ProfileResponse response = userService.getCurrentUser();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "User profile fetched successfully.",
                        response
                )
        );
    }

    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ProfileResponse>> updateCurrentUser(
            @Valid @RequestBody UpdateProfileRequest request) {

        ProfileResponse response = userService.updateCurrentUser(request);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Profile updated successfully.",
                        response
                )
        );
    }

    @PutMapping("/me/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Password changed successfully.",
                        null
                )
        );
    }
}