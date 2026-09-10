package com.aayush.assetmanagement.issue.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.issue.dto.IssueRequest;
import com.aayush.assetmanagement.issue.dto.IssueResponse;
import com.aayush.assetmanagement.issue.service.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ApiResponse<IssueResponse> createIssue(
            @Valid @RequestBody IssueRequest request
    ) {

        IssueResponse response = issueService.createIssue(request);

        return ResponseBuilder.success(
                "Issue created successfully.",
                response
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ApiResponse<IssueResponse> getIssueById(
            @PathVariable Long id
    ) {

        IssueResponse response = issueService.getIssueById(id);

        return ResponseBuilder.success(
                "Issue retrieved successfully.",
                response
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN', 'EMPLOYEE')")
    public ApiResponse<List<IssueResponse>> getAllIssues() {

        List<IssueResponse> response = issueService.getAllIssues();

        return ResponseBuilder.success(
                "Issues retrieved successfully.",
                response
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<IssueResponse> updateIssue(
            @PathVariable Long id,
            @Valid @RequestBody IssueRequest request
    ) {

        IssueResponse response = issueService.updateIssue(id, request);

        return ResponseBuilder.success(
                "Issue updated successfully.",
                response
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteIssue(
            @PathVariable Long id
    ) {

        issueService.deleteIssue(id);

        return ResponseBuilder.success(
                "Issue deleted successfully.",
                null
        );
    }
}