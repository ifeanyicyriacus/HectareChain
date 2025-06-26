package com.emia.offchainjava.data.repository;

import com.emia.offchainjava.data.model.Admin;

import java.util.List;

public interface AdminRepository {
    Admin save(Admin admin);
    List<Admin> findAll();

}
