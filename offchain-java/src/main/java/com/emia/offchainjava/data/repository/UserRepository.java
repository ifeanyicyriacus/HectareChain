package com.emia.offchainjava.data.repository;
import com.emia.offchainjava.data.model.User;

import java.util.List;


public interface UserRepository {
    User save(User user);
    List<User> findAll();
}
