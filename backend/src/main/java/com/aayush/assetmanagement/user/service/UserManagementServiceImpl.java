package com.aayush.assetmanagement.user.service;

import com.aayush.assetmanagement.employee.repository.EmployeeRepository;
import com.aayush.assetmanagement.exception.BadRequestException;
import com.aayush.assetmanagement.exception.DuplicateResourceException;
import com.aayush.assetmanagement.exception.ResourceNotFoundException;
import com.aayush.assetmanagement.user.dto.UserRequest;
import com.aayush.assetmanagement.user.dto.UserResponse;
import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.mapper.UserManagementMapper;
import com.aayush.assetmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final UserManagementMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User email already exists.");
        }

        User user = userMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {

        return userMapper.toResponse(getUser(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAvailableUsers() {

        return userRepository.findAvailableUsers()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {

        User user = getUser(id);

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "User email already exists."
            );
        }

        userMapper.updateEntityFromRequest(request, user);

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
        }

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {

        User user = getUser(id);

        if (employeeRepository.existsByUser(user)) {
            throw new BadRequestException(
                    "Cannot delete a user linked to an employee."
            );
        }

        userRepository.delete(user);
    }

    private User getUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id
                        ));
    }
}