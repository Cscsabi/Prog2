package com.newsequence.api.service;

import com.newsequence.api.model.User;

import java.util.List;

public interface UserService {

    User register(User user);

    User getUser(Long id);

    List<User> getUsers();
}
