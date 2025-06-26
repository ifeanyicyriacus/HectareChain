package com.emia.offchainjava.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Admin {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
