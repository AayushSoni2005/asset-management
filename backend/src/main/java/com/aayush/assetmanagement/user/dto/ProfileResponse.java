package com.aayush.assetmanagement.user.dto;

import java.time.LocalDateTime;

import com.aayush.assetmanagement.employee.enums.EmployeeStatus;
import com.aayush.assetmanagement.user.enums.Role;

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
public class ProfileResponse {

    /*
     * User Information
     */
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

    private boolean enabled;

    /*
     * Profile State
     */
    private boolean hasEmployeeProfile;

    private String profileMessage;

    /*
     * Employee Information
     */
    private String employeeId;

    private String phoneNumber;

    private String department;

    private String designation;

    private EmployeeStatus status;

    /*
     * Audit Information
     */
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}