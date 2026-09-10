package com.aayush.assetmanagement.equipment.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.equipment.dto.EquipmentRequest;
import com.aayush.assetmanagement.equipment.dto.EquipmentResponse;
import com.aayush.assetmanagement.equipment.service.EquipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<EquipmentResponse> createEquipment(
            @Valid @RequestBody EquipmentRequest request
    ) {

        EquipmentResponse response = equipmentService.createEquipment(request);

        return ResponseBuilder.success(
                "Equipment created successfully.",
                response
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ApiResponse<EquipmentResponse> getEquipmentById(
            @PathVariable Long id
    ) {

        EquipmentResponse response = equipmentService.getEquipmentById(id);

        return ResponseBuilder.success(
                "Equipment retrieved successfully.",
                response
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ApiResponse<List<EquipmentResponse>> getAllEquipment() {

        List<EquipmentResponse> response = equipmentService.getAllEquipment();

        return ResponseBuilder.success(
                "Equipment retrieved successfully.",
                response
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<EquipmentResponse> updateEquipment(
            @PathVariable Long id,
            @Valid @RequestBody EquipmentRequest request
    ) {

        EquipmentResponse response = equipmentService.updateEquipment(id, request);

        return ResponseBuilder.success(
                "Equipment updated successfully.",
                response
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteEquipment(
            @PathVariable Long id
    ) {

        equipmentService.deleteEquipment(id);

        return ResponseBuilder.success(
                "Equipment deleted successfully.",
                null
        );
    }
}