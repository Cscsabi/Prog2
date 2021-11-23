package com.newsequence.api.service.impl;

import com.newsequence.api.exception.user.UserDoesNotExistException;
import com.newsequence.api.model.AuthRequest;
import com.newsequence.api.model.Authority;
import com.newsequence.api.model.User;
import com.newsequence.api.repository.AuthorityRepository;
import com.newsequence.api.repository.UserRepository;
import com.newsequence.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Component
public class NewSequenceUserService implements UserService {


    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public NewSequenceUserService(AuthorityRepository authorityRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(AuthRequest authRequest) {
        User user = userRepository.getByEmailAddress(authRequest.getUsername());

        if (user != null) {
            throw new IllegalStateException("email already taken");
        }
        user = new User();
        user.setEmailAddress(authRequest.getUsername());

        Authority authority = this.authorityRepository.getByAuthority(Authority.USER);
        if(authority == null) {
            this.authorityRepository.saveAndFlush(new Authority(Authority.USER));
        }
        authority = this.authorityRepository.getByAuthority(Authority.USER);

        user.setAuthorities(new HashSet<>(Collections.singletonList(authority)));

        String encodedPassword = passwordEncoder.encode(authRequest.getPassword());
        user.setPassword(encodedPassword);

        // TODO: get from ui
        user.setFirstName("asd");
        user.setLastName("asd");

        userRepository.save(user);

        return user;
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

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailAddress(email);
    }
}
