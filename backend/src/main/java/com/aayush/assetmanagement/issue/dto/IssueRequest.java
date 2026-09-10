package com.aayush.assetmanagement.issue.dto;

import com.aayush.assetmanagement.issue.enums.IssuePriority;
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
public class IssueRequest {

    @NotNull(message = "Equipment id is required.")
    private Long equipmentId;

    @NotNull(message = "Reported by employee id is required.")
    private Long reportedByEmployeeId;

    private Long assignedToEmployeeId;

    @NotBlank(message = "Issue title is required.")
    @Size(max = 500, message = "Issue title must not exceed 500 characters.")
    private String title;

    @NotBlank(message = "Issue description is required.")
    @Size(max = 2000, message = "Issue description must not exceed 2000 characters.")
    private String description;

    @NotNull(message = "Issue priority is required.")
    private IssuePriority priority;

}