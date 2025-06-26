package com.emia.offchainjava.web;

import com.emia.offchainjava.dtos.request.UserLoginRequest;
import com.emia.offchainjava.dtos.request.UserRegistrationRequest;
import com.emia.offchainjava.dtos.response.UserLoginResponse;
import com.emia.offchainjava.dtos.response.UserRegistrationResponse;
import com.emia.offchainjava.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserRegistrationResponse register(@RequestBody UserRegistrationRequest request) {
        return userService.register(request);
    }

    @PostMapping("/Login")
    public UserLoginResponse login(@RequestBody UserLoginRequest request) {
        return userService.login(request);
    }

    @GetMapping
    public List<UserRegistrationResponse> getUsers(){
        return userService.getAllUsers();
    }
}
