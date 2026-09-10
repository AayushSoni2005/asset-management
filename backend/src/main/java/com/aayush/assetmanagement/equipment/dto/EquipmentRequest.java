package com.aayush.assetmanagement.equipment.dto;

import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class EquipmentRequest {

    @NotBlank(message = "Asset tag is required.")
    @Size(max = 50, message = "Asset tag must not exceed 50 characters.")
    private String assetTag;

    @NotBlank(message = "Equipment name is required.")
    @Size(max = 100, message = "Equipment name must not exceed 100 characters.")
    private String name;

    @NotBlank(message = "Category is required.")
    @Size(max = 100, message = "Category must not exceed 100 characters.")
    private String category;

    @NotBlank(message = "Brand is required.")
    @Size(max = 100, message = "Brand must not exceed 100 characters.")
    private String brand;

    @NotBlank(message = "Model is required.")
    @Size(max = 100, message = "Model must not exceed 100 characters.")
    private String model;

    @NotBlank(message = "Serial number is required.")
    @Size(max = 100, message = "Serial number must not exceed 100 characters.")
    private String serialNumber;

    @Size(max = 100, message = "Location must not exceed 100 characters.")
    private String location;

    @NotNull(message = "Equipment status is required.")
    private EquipmentStatus status;

    private Long assignedToEmployeeId;

}