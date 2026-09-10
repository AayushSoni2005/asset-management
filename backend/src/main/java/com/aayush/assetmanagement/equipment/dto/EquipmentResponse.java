package com.aayush.assetmanagement.equipment.dto;

import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentResponse {

    private Long id;

    private String assetTag;

    private String name;

    private String category;

    private String brand;

    private String model;

    private String serialNumber;

    private String location;

    private EquipmentStatus status;

    private AssignedEmployeeResponse assignedTo;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}