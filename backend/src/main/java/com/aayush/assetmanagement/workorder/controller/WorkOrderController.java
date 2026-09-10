package com.aayush.assetmanagement.workorder.controller;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import com.aayush.assetmanagement.workorder.dto.WorkOrderRequest;
import com.aayush.assetmanagement.workorder.dto.WorkOrderResponse;
import com.aayush.assetmanagement.workorder.service.WorkOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/work-orders")
@RequiredArgsConstructor
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<WorkOrderResponse> createWorkOrder(
            @Valid @RequestBody WorkOrderRequest request
    ) {

        WorkOrderResponse response = workOrderService.createWorkOrder(request);

        return ResponseBuilder.success(
                "Work order created successfully.",
                response
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<WorkOrderResponse> getWorkOrderById(
            @PathVariable Long id
    ) {

        WorkOrderResponse response = workOrderService.getWorkOrderById(id);

        return ResponseBuilder.success(
                "Work order retrieved successfully.",
                response
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<List<WorkOrderResponse>> getAllWorkOrders() {

        List<WorkOrderResponse> response = workOrderService.getAllWorkOrders();

        return ResponseBuilder.success(
                "Work orders retrieved successfully.",
                response
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<WorkOrderResponse> updateWorkOrder(
            @PathVariable Long id,
            @Valid @RequestBody WorkOrderRequest request
    ) {

        WorkOrderResponse response = workOrderService.updateWorkOrder(id, request);

        return ResponseBuilder.success(
                "Work order updated successfully.",
                response
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteWorkOrder(
            @PathVariable Long id
    ) {

        workOrderService.deleteWorkOrder(id);

        return ResponseBuilder.success(
                "Work order deleted successfully.",
                null
        );
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<WorkOrderResponse> assignWorkOrder(
            @PathVariable Long id
    ) {

        WorkOrderResponse response = workOrderService.assignWorkOrder(id);

        return ResponseBuilder.success(
                "Work order assigned successfully.",
                response
        );
    }

    @PatchMapping("/{id}/start")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<WorkOrderResponse> startWorkOrder(
            @PathVariable Long id
    ) {

        WorkOrderResponse response = workOrderService.startWorkOrder(id);

        return ResponseBuilder.success(
                "Work order started successfully.",
                response
        );
    }

    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<WorkOrderResponse> completeWorkOrder(
            @PathVariable Long id
    ) {

        WorkOrderResponse response = workOrderService.completeWorkOrder(id);

        return ResponseBuilder.success(
                "Work order completed successfully.",
                response
        );
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ApiResponse<WorkOrderResponse> cancelWorkOrder(
            @PathVariable Long id
    ) {

        WorkOrderResponse response = workOrderService.cancelWorkOrder(id);

        return ResponseBuilder.success(
                "Work order cancelled successfully.",
                response
        );
    }
}