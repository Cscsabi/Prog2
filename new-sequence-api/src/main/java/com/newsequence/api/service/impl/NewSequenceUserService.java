package com.newsequence.api.service.impl;

import com.newsequence.api.exception.user.UserDoesNotExistException;
import com.newsequence.api.model.User;
import com.newsequence.api.repository.UserRepository;
import com.newsequence.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NewSequenceUserService implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public NewSequenceUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {
        return null;
    }

    @Override
    public User login(String email, String password) {
        return null;
    }

    @Override
    public User getUser(Long id) {
        Optional<User> user;

        user = this.userRepository.findById(id);

        if(user.isEmpty()) {
            throw new UserDoesNotExistException();
        }

        return  user.get();
    }
}
