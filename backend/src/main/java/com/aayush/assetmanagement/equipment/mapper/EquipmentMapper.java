package com.aayush.assetmanagement.equipment.mapper;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.equipment.dto.AssignedEmployeeResponse;
import com.aayush.assetmanagement.equipment.dto.EquipmentRequest;
import com.aayush.assetmanagement.equipment.dto.EquipmentResponse;
import com.aayush.assetmanagement.equipment.entity.Equipment;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface EquipmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    Equipment toEntity(EquipmentRequest request);

    EquipmentResponse toResponse(Equipment equipment);

    AssignedEmployeeResponse toAssignedEmployeeResponse(Employee employee);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    void updateEquipmentFromRequest(
            EquipmentRequest request,
            @MappingTarget Equipment equipment
    );

}