package com.aayush.assetmanagement.email.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendVerificationEmail(
            String to,
            String verificationLink
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Verify Your Email - IT Asset Management System");

        message.setText("""
                Hello,

                Thank you for registering with the IT Asset Management System.

                Please verify your email by clicking the link below:

                %s

                This verification link will expire in 24 hours.

                If you did not create this account, you can safely ignore this email.

                Regards,
                IT Asset Management Team
                """.formatted(verificationLink));

        mailSender.send(message);
    }
}