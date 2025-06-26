package com.emia.offchainjava.data.repository;

import com.emia.offchainjava.data.model.Admin;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryAdminRepository implements AdminRepository {
    private final Map<String, Admin> admins = new ConcurrentHashMap<>();

    @Override
    public Admin save(Admin admin) {
        admins.put(admin.getId(), admin);
        return admin;
    }

    @Override
    public List<Admin> findAll() {
        return new ArrayList<>(admins.values());
    }
}
