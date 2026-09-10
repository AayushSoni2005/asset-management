package com.aayush.assetmanagement.workorder.dto;

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
public class WorkOrderRequest {

    @NotNull(message = "Issue ID is required.")
    private Long issueId;

    @NotNull(message = "Technician ID is required.")
    private Long technicianId;

    @NotBlank(message = "Title is required.")
    @Size(max = 500, message = "Title must not exceed 500 characters.")
    private String title;

    @Size(max = 2000, message = "Repair notes must not exceed 2000 characters.")
    private String repairNotes;

}