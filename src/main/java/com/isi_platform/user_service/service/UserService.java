package com.isi_platform.user_service.service;

import com.isi_platform.user_service.dto.UserRegistrationRequest;

public interface UserService {
    void registerNewUser(UserRegistrationRequest registrationRequest);
}
