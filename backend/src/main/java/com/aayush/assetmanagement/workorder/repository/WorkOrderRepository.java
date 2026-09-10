package com.aayush.assetmanagement.workorder.repository;

import com.aayush.assetmanagement.workorder.entity.WorkOrder;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    Optional<WorkOrder> findByWorkOrderNumber(String workOrderNumber);

//    Optional<WorkOrder> findByIssueId(Long issueId);
    
    List<WorkOrder> findByIssueId(Long issueId);

    boolean existsByIssueId(Long issueId);

    List<WorkOrder> findByTechnicianId(Long technicianId);

    boolean existsByTechnicianId(Long technicianId);

   

    List<WorkOrder> findByStatus(WorkOrderStatus status);

    long countByStatus(WorkOrderStatus status);

    @Query("""
           SELECT COUNT(w)
           FROM WorkOrder w
           WHERE FUNCTION('MONTH', w.createdAt) = :month
           """)
    long countByCreatedMonth(@Param("month") int month);

    long countByTechnicianId(Long technicianId);
}