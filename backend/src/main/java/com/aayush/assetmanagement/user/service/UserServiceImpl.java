package com.aayush.assetmanagement.user.service;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.exception.BadRequestException;
import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.user.dto.ChangePasswordRequest;
import com.aayush.assetmanagement.user.dto.ProfileResponse;
import com.aayush.assetmanagement.user.dto.UpdateProfileRequest;
import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.mapper.ProfileMapper;
import com.aayush.assetmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final ProfileMapper profileMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getCurrentUser() {

        User user = getAuthenticatedUser();

        return employeeRepository.findByUser(user)
                .map(profileMapper::toResponse)
                .orElseGet(() -> profileMapper.toResponse(user));
    }

    @Override
    public ProfileResponse updateCurrentUser(UpdateProfileRequest request) {

        User user = getAuthenticatedUser();

        Employee employee = employeeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee profile not found."
                        ));

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());

        Employee updatedEmployee = employeeRepository.save(employee);

        return profileMapper.toResponse(updatedEmployee);
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {

        User user = getAuthenticatedUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new BadRequestException(
                    "Current password is incorrect."
            );
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {

            throw new BadRequestException(
                    "New password and confirm password do not match."
            );
        }

        if (passwordEncoder.matches(
                request.getNewPassword(),
                user.getPassword())) {

            throw new BadRequestException(
                    "New password must be different from the current password."
            );
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }
}