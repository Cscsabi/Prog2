package com.newsequence.api.service;

import com.newsequence.api.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User register(User user);

    User login(String email, String password);

    User getUser(Long id);
}
