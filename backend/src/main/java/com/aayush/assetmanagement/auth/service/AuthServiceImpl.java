package com.aayush.assetmanagement.auth.service;

import com.aayush.assetmanagement.auth.dto.AuthResponse;
import com.aayush.assetmanagement.auth.dto.LoginRequest;
import com.aayush.assetmanagement.auth.dto.RegisterRequest;
import com.aayush.assetmanagement.auth.mapper.UserMapper;
import com.aayush.assetmanagement.email.service.EmailService;
import com.aayush.assetmanagement.exception.BadRequestException;
import com.aayush.assetmanagement.exception.DuplicateResourceException;
import com.aayush.assetmanagement.security.jwt.JwtService;
import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.enums.Role;
import com.aayush.assetmanagement.user.repository.UserRepository;
import com.aayush.assetmanagement.verification.entity.VerificationToken;
import com.aayush.assetmanagement.verification.repository.VerificationTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final VerificationTokenRepository verificationTokenRepository;
    private final EmailService emailService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "User already exists with email: " + request.getEmail()
            );
        }

        User user = userMapper.toEntity(request);

        user.setRole(Role.EMPLOYEE);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false);

        user = userRepository.save(user);

        createAndSendVerificationEmail(user);

        return AuthResponse.builder()
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(user))
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    public void verifyEmail(String token, String email) {

        Optional<VerificationToken> tokenOptional =
                verificationTokenRepository.findByToken(token);

        if (tokenOptional.isEmpty()) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new BadRequestException("Invalid verification link."));

            if (user.isEnabled()) {
                throw new BadRequestException(
                        "Your email is already verified."
                );
            }

            throw new BadRequestException(
                    "Invalid verification link."
            );
        }

        VerificationToken verificationToken = tokenOptional.get();

        if (verificationToken.isExpired()) {
            verificationTokenRepository.delete(verificationToken);

            throw new BadRequestException(
                    "Verification link has expired."
            );
        }

        User user = verificationToken.getUser();

        user.setEnabled(true);

        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);
    }

    @Override
    public void resendVerificationEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException(
                                "User not found with email: " + email
                        ));

        if (user.isEnabled()) {
            throw new BadRequestException(
                    "Email is already verified."
            );
        }

        createAndSendVerificationEmail(user);
    }

    private void createAndSendVerificationEmail(User user) {

        verificationTokenRepository.deleteByUser(user);

        VerificationToken verificationToken =
                VerificationToken.create(user);

        verificationTokenRepository.save(verificationToken);

        String verificationLink =
                frontendUrl
                        + "/verify-email?token="
                        + verificationToken.getToken()
                        + "&email="
                        + user.getEmail();

        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationLink
        );
    }
}