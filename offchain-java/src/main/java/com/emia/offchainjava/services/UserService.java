package com.emia.offchainjava.services;

import com.emia.offchainjava.dtos.request.UserLoginRequest;
import com.emia.offchainjava.dtos.request.UserRegistrationRequest;
import com.emia.offchainjava.dtos.response.UserLoginResponse;
import com.emia.offchainjava.dtos.response.UserRegistrationResponse;

import java.util.List;

public interface UserService  {
    UserRegistrationResponse register(UserRegistrationRequest request);
    List<UserRegistrationResponse> getAllUsers();

    UserLoginResponse login(UserLoginRequest request);
//    List<UserLoginResponse> getAUsers();
}
