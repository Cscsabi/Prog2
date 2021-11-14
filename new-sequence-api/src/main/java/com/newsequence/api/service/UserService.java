package com.newsequence.api.service;

import com.newsequence.api.model.User;

import java.util.List;

public interface UserService {

    User register(User user);

    //User login(String email, String password);

    User getUser(Long id);

    List<User> getUsers();
}
