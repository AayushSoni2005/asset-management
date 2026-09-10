package com.aayush.assetmanagement.issue.entity;

import com.aayush.assetmanagement.common.entity.BaseEntity;
import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.equipment.entity.Equipment;
import com.aayush.assetmanagement.issue.enums.IssuePriority;
import com.aayush.assetmanagement.issue.enums.IssueStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
//@Builder
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "issues")
public class Issue extends BaseEntity {

    @Column(nullable = false, unique = true, length = 30)
    private String issueNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by", nullable = false)
    private Employee reportedBy;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssuePriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private Employee assignedTo;

}