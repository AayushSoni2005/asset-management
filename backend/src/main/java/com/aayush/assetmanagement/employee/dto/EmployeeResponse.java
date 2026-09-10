package com.aayush.assetmanagement.employee.dto;

import com.aayush.assetmanagement.employee.enums.EmployeeStatus;
import com.aayush.assetmanagement.user.enums.Role;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {

    private Long id;

    // Linked User Information
    private Long userId;

    private String email;

    private Role role;

    private boolean enabled;

    // Employee Information
    private String employeeId;

    private String firstName;

    private String lastName;

    private String fullName;

    private String phoneNumber;

    private String department;

    private String designation;

    private EmployeeStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}