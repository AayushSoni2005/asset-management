package com.aayush.assetmanagement.issue.repository;

import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.issue.enums.IssuePriority;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    Optional<Issue> findByIssueNumber(String issueNumber);

    boolean existsByIssueNumber(String issueNumber);

    // ⭐ Added for delete validation
    boolean existsByEquipmentId(Long equipmentId);

    List<Issue> findByStatus(IssueStatus status);

    List<Issue> findByPriority(IssuePriority priority);

    List<Issue> findByReportedById(Long employeeId);

    List<Issue> findByAssignedToId(Long employeeId);

    List<Issue> findByEquipmentId(Long equipmentId);

    long countByStatus(IssueStatus status);

    @Query("""
           SELECT COUNT(i)
           FROM Issue i
           WHERE FUNCTION('MONTH', i.createdAt) = :month
           """)
    long countByCreatedMonth(@Param("month") int month);

    long countByPriority(IssuePriority priority);
    
    boolean existsByReportedById(Long employeeId);

    boolean existsByAssignedToId(Long employeeId);
}