package com.aayush.assetmanagement.equipment.service;

import com.aayush.assetmanagement.analytics.dto.ChartDataResponse;
import com.aayush.assetmanagement.equipment.dto.EquipmentRequest;
import com.aayush.assetmanagement.equipment.dto.EquipmentResponse;

import java.util.List;

public interface EquipmentService {

    EquipmentResponse createEquipment(EquipmentRequest request);

    EquipmentResponse getEquipmentById(Long id);

    List<EquipmentResponse> getAllEquipment();

    EquipmentResponse updateEquipment(Long id, EquipmentRequest request);

    void deleteEquipment(Long id);

    List<ChartDataResponse> getEquipmentCategoryAnalytics();
}