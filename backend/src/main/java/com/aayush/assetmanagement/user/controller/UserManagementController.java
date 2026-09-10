package com.aayush.assetmanagement.user.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.user.dto.UserRequest;
import com.aayush.assetmanagement.user.dto.UserResponse;
import com.aayush.assetmanagement.user.service.UserManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserManagementController {

    private final UserManagementService userManagementService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody UserRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "User created successfully.",
                        userManagementService.createUser(request)
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Users fetched successfully.",
                        userManagementService.getAllUsers()
                )
        );
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAvailableUsers() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Available users fetched successfully.",
                        userManagementService.getAvailableUsers()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "User fetched successfully.",
                        userManagementService.getUserById(id)
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest request
    ) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "User updated successfully.",
                        userManagementService.updateUser(id, request)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id
    ) {

        userManagementService.deleteUser(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "User deleted successfully.",
                        null
                )
        );
    }
}