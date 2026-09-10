package com.aayush.assetmanagement.verification.repository;

import com.aayush.assetmanagement.verification.entity.VerificationToken;
import com.aayush.assetmanagement.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationTokenRepository
        extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);

    Optional<VerificationToken> findByUser(User user);

    void deleteByUser(User user);
}