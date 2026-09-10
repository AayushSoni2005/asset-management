package com.aayush.assetmanagement.workorder.service;

import com.aayush.assetmanagement.workorder.dto.WorkOrderRequest;
import com.aayush.assetmanagement.workorder.dto.WorkOrderResponse;


import java.util.List;

public interface WorkOrderService {

    WorkOrderResponse createWorkOrder(WorkOrderRequest request);

    WorkOrderResponse getWorkOrderById(Long id);

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse updateWorkOrder(Long id, WorkOrderRequest request);

    void deleteWorkOrder(Long id);

    WorkOrderResponse assignWorkOrder(Long id);

    WorkOrderResponse startWorkOrder(Long id);

    WorkOrderResponse completeWorkOrder(Long id);

    WorkOrderResponse cancelWorkOrder(Long id);

}