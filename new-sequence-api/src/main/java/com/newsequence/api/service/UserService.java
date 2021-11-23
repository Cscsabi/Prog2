package com.newsequence.api.service;

import com.newsequence.api.model.AuthRequest;
import com.newsequence.api.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User register(AuthRequest user);

    User getUser(Long id);

    List<User> getUsers();

    Optional<User> findByEmail(String email);
}
