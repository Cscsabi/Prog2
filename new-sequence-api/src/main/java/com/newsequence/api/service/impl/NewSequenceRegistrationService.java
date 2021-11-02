package com.newsequence.api.service.impl;

import com.newsequence.api.annotation.impl.EmailValidator;
import com.newsequence.api.model.User;
import com.newsequence.api.request.RegistrationRequest;
import com.newsequence.api.service.UserService;
import lombok.AllArgsConstructor;
import org.jvnet.hk2.annotations.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@AllArgsConstructor
public class NewSequenceRegistrationService {

    private final EmailValidator emailValidator;
    private final UserService userService;

    @Autowired
    public User register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid!");
        }

        return userService.register(
                new User(
                        request.getId(),
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getRole()
                )
        );
    }
}
