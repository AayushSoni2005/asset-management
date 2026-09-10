package com.aayush.assetmanagement.security.jwt;

import java.util.Map;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    /**
     * Generate JWT token.
     */
    String generateToken(UserDetails userDetails);

    /**
     * Generate JWT token with additional claims.
     */
    String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    );

    /**
     * Extract username (email) from JWT.
     */
    String extractUsername(String token);

    /**
     * Validate JWT token.
     */
    boolean isTokenValid(String token, UserDetails userDetails);

    /**
     * Check whether the token has expired.
     */
    boolean isTokenExpired(String token);

}