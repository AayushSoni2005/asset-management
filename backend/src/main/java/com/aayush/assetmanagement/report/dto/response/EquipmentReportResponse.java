package com.aayush.assetmanagement.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentReportResponse {

	private long totalEquipment;
	private long availableEquipment;
	private long assignedEquipment;
	private long maintenanceEquipment;
	private long retiredEquipment;
	private long lostEquipment;
	private long damagedEquipment;

}