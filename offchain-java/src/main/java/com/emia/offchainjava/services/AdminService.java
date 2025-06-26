package com.emia.offchainjava.services;

import com.emia.offchainjava.dtos.request.AdminLoginRequest;
import com.emia.offchainjava.dtos.request.AdminRegistrationRequest;
import com.emia.offchainjava.dtos.response.AdminLoginResponse;
import com.emia.offchainjava.dtos.response.AdminRegistrationResponse;

import java.util.List;

public interface AdminService {
    AdminRegistrationResponse register(AdminRegistrationRequest request);
    List<AdminRegistrationResponse> getAllAdmins();

    AdminLoginResponse login(AdminLoginRequest request);
//    List<AdminLoginResponse> getAdmin();
}
