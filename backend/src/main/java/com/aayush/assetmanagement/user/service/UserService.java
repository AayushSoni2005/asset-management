package com.aayush.assetmanagement.user.service;

import com.aayush.assetmanagement.user.dto.ChangePasswordRequest;
import com.aayush.assetmanagement.user.dto.ProfileResponse;
import com.aayush.assetmanagement.user.dto.UpdateProfileRequest;

public interface UserService {

	ProfileResponse  getCurrentUser();

    ProfileResponse  updateCurrentUser(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);

}