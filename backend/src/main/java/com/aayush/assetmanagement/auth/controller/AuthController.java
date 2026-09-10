package com.aayush.assetmanagement.auth.controller;

import com.aayush.assetmanagement.auth.dto.AuthResponse;
import com.aayush.assetmanagement.auth.dto.LoginRequest;
import com.aayush.assetmanagement.auth.dto.RegisterRequest;
import com.aayush.assetmanagement.auth.service.AuthService;
import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Authentication",
        description = "Authentication and Account Management APIs"
)
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "Registration successful. Please verify your email.",
                        response
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Login successful.",
                        response
                )
        );
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestParam String token,
            @RequestParam String email) {

        authService.verifyEmail(token, email);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Email verified successfully.",
                        null
                )
        );
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<Void>> resendVerificationEmail(
            @RequestParam String email) {

        authService.resendVerificationEmail(email);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Verification email sent successfully.",
                        null
                )
        );
    }
}