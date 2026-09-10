package com.aayush.assetmanagement.employee.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.employee.dto.EmployeeRequest;
import com.aayush.assetmanagement.employee.dto.EmployeeResponse;
import com.aayush.assetmanagement.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeRequest request
    ) {

        return ResponseBuilder.success(
                "Employee created successfully.",
                employeeService.createEmployee(request)
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<EmployeeResponse> getEmployeeById(
            @PathVariable Long id
    ) {

        return ResponseBuilder.success(
                "Employee retrieved successfully.",
                employeeService.getEmployeeById(id)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<List<EmployeeResponse>> getAllEmployees() {

        return ResponseBuilder.success(
                "Employees retrieved successfully.",
                employeeService.getAllEmployees()
        );
    }

    @GetMapping("/technicians")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<List<EmployeeResponse>> getTechnicians() {

        return ResponseBuilder.success(
                "Technicians retrieved successfully.",
                employeeService.getTechnicians()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request
    ) {

        return ResponseBuilder.success(
                "Employee updated successfully.",
                employeeService.updateEmployee(id, request)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteEmployee(
            @PathVariable Long id
    ) {

        employeeService.deleteEmployee(id);

        return ResponseBuilder.success(
                "Employee deleted successfully.",
                null
        );
    }
}