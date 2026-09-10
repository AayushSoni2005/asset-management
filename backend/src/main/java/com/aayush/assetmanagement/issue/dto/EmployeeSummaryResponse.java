package com.aayush.assetmanagement.issue.dto;

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
public class EmployeeSummaryResponse {

    private Long id;

    private String employeeId;

    private String firstName;

    private String lastName;

    private String fullName;

    private String email;

    private Role role;

    private String department;

    private String designation;
}