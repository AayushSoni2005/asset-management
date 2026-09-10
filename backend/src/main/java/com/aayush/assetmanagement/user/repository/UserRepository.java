package com.aayush.assetmanagement.user.repository;

import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.enums.Role;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<User> findByEmailContainingIgnoreCase(
            String email,
            Pageable pageable
    );

    Page<User> findByRole(
            Role role,
            Pageable pageable
    );

    @Query("""
            SELECT u
            FROM User u
            WHERE u.employee IS NULL
            ORDER BY u.email
            """)
    List<User> findAvailableUsers();

    long countByRole(Role admin);

}