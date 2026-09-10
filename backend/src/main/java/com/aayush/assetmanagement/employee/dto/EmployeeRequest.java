package com.aayush.assetmanagement.employee.dto;

import com.aayush.assetmanagement.employee.enums.EmployeeStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class EmployeeRequest {

    @NotNull(message = "User is required.")
    private Long userId;

    @NotBlank(message = "Employee code is required.")
    @Size(max = 20, message = "Employee code must not exceed 20 characters.")
    private String employeeId;

    @NotBlank(message = "First name is required.")
    @Size(max = 50, message = "First name must not exceed 50 characters.")
    private String firstName;

    @NotBlank(message = "Last name is required.")
    @Size(max = 50, message = "Last name must not exceed 50 characters.")
    private String lastName;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits."
    )
    private String phoneNumber;

    @NotBlank(message = "Department is required.")
    @Size(max = 100, message = "Department must not exceed 100 characters.")
    private String department;

    @NotBlank(message = "Designation is required.")
    @Size(max = 100, message = "Designation must not exceed 100 characters.")
    private String designation;

    @NotNull(message = "Status is required.")
    private EmployeeStatus status;
}