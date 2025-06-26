package com.emia.offchainjava.services;

import com.emia.offchainjava.data.model.Admin;
import com.emia.offchainjava.data.repository.AdminRepository;
import com.emia.offchainjava.dtos.request.AdminLoginRequest;
import com.emia.offchainjava.dtos.request.AdminRegistrationRequest;
import com.emia.offchainjava.dtos.response.AdminLoginResponse;
import com.emia.offchainjava.dtos.response.AdminRegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final AdminRepository adminRepository;

    @Override
    public AdminRegistrationResponse register(AdminRegistrationRequest request) {
        Admin admin = new Admin(UUID.randomUUID().toString(), request.getFirstname(), request.getLastname(), request.getEmail(), request.getPassword());
        adminRepository.save(admin);
        return new AdminRegistrationResponse("Admin registered sucessfully");
    }

    @Override
    public List<AdminRegistrationResponse> getAllAdmins() {

        return adminRepository.findAll().stream().map(admin -> new AdminRegistrationResponse("Admin: " + admin.getFirstname())).collect(Collectors.toList());
    }

    @Override
    public AdminLoginResponse login(AdminLoginRequest request) {
        return new AdminLoginResponse("Login sucessfully");
    }
}
