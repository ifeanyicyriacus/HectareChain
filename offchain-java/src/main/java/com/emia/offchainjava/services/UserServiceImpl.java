package com.emia.offchainjava.services;

import com.emia.offchainjava.data.model.User;
import com.emia.offchainjava.data.repository.UserRepository;
import com.emia.offchainjava.dtos.request.UserLoginRequest;
import com.emia.offchainjava.dtos.request.UserRegistrationRequest;
import com.emia.offchainjava.dtos.response.UserLoginResponse;
import com.emia.offchainjava.dtos.response.UserRegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl  implements UserService{
    private final UserRepository userRepository;

    @Override
    public UserRegistrationResponse register(UserRegistrationRequest request) {
        User user = new User(UUID.randomUUID().toString(), request.getFirstname(), request.getLastname(),request.getEmail(), request.getPassword());
        userRepository.save(user);
        return new UserRegistrationResponse("User registered successfully");
    }

    @Override
    public List<UserRegistrationResponse> getAllUsers() {
        return userRepository.findAll().stream().map(user -> new UserRegistrationResponse("User: " + user.getFirstname())).collect(Collectors.toList());
    }

    @Override
    public UserLoginResponse login(UserLoginRequest request) {

        return new UserLoginResponse("Login sucessful");
    }

//    @Override
//    public List<UserLoginResponse> getAUsers() {
//        return List.of();

}
