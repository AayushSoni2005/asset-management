package com.aayush.assetmanagement.equipment.repository;

import com.aayush.assetmanagement.equipment.entity.Equipment;
import com.aayush.assetmanagement.equipment.enums.EquipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    Optional<Equipment> findByAssetTag(String assetTag);

    Optional<Equipment> findBySerialNumber(String serialNumber);

    boolean existsByAssetTag(String assetTag);

    boolean existsBySerialNumber(String serialNumber);

    List<Equipment> findByAssignedToId(Long employeeId);

    List<Equipment> findByStatus(EquipmentStatus status);

    long countByStatus(EquipmentStatus status);

    @Query("""
            SELECT e.category, COUNT(e)
            FROM Equipment e
            GROUP BY e.category
            ORDER BY COUNT(e) DESC
            """)
    List<Object[]> countEquipmentByCategory();
    
    boolean existsByAssignedToId(Long employeeId);
}