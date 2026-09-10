package com.aayush.assetmanagement.email.service;

public interface EmailService {

    void sendVerificationEmail(
            String to,
            String verificationLink
    );

}