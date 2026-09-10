package com.aayush.assetmanagement.issue.dto;

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
public class EquipmentSummaryResponse {

    private Long id;

    private String assetTag;

    private String name;

    private String category;

    private String brand;

    private String model;

}