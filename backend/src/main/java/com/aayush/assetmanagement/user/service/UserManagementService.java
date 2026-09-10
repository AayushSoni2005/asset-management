package com.aayush.assetmanagement.user.service;

import java.util.List;


import com.aayush.assetmanagement.user.dto.UserRequest;
import com.aayush.assetmanagement.user.dto.UserResponse;

public interface UserManagementService {

	UserResponse createUser(UserRequest request);

	UserResponse getUserById(Long id);

	List<UserResponse> getAllUsers();
	
	List<UserResponse> getAvailableUsers();

	UserResponse updateUser(Long id, UserRequest request);

	void deleteUser(Long id);

}