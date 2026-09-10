package com.aayush.assetmanagement.auth.service;

import com.aayush.assetmanagement.auth.dto.AuthResponse;
import com.aayush.assetmanagement.auth.dto.LoginRequest;
import com.aayush.assetmanagement.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    void verifyEmail(String token, String email);

    void resendVerificationEmail(String email);

}