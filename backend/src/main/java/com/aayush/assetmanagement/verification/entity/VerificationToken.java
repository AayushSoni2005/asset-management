package com.aayush.assetmanagement.verification.entity;

import com.aayush.assetmanagement.common.entity.BaseEntity;
import com.aayush.assetmanagement.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "verification_tokens")
public class VerificationToken extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String token;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    public static VerificationToken create(User user) {
        return VerificationToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(24))
                .build();
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
}