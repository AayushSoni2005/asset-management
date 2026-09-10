package com.aayush.assetmanagement.workorder.entity;

import com.aayush.assetmanagement.common.entity.BaseEntity;
import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.issue.entity.Issue;
import com.aayush.assetmanagement.workorder.enums.WorkOrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
//@Builder
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "work_orders")
public class WorkOrder extends BaseEntity {

    @Column(nullable = false, unique = true, length = 30)
    private String workOrderNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, unique = true)
    private Issue issue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id")
    private Employee technician;
    
    

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 2000)
    private String repairNotes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkOrderStatus status;

    private LocalDateTime assignedAt;

    private LocalDateTime completedAt;

}