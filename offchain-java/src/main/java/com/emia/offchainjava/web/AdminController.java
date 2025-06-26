package com.emia.offchainjava.web;

import com.emia.offchainjava.dtos.request.AdminLoginRequest;
import com.emia.offchainjava.dtos.request.AdminRegistrationRequest;
import com.emia.offchainjava.dtos.response.AdminLoginResponse;
import com.emia.offchainjava.dtos.response.AdminRegistrationResponse;
import com.emia.offchainjava.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register")
    public AdminRegistrationResponse register(@RequestBody AdminRegistrationRequest request) {
        return adminService.register(request);
    }

    @PostMapping("/login")
    public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {
        return adminService.login(request);
    }

    @GetMapping
    public List<AdminRegistrationResponse> getAdmins() {
        return adminService.getAllAdmins();
    }
}
