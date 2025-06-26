package com.emia.offchainjava.dtos.request;

import lombok.Data;

@Data
public class AdminRegistrationRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
