package com.newsequence.api.controller;

import com.newsequence.api.model.User;
import com.newsequence.api.request.RegistrationRequest;
import com.newsequence.api.service.impl.NewSequenceRegistrationService;
import lombok.AllArgsConstructor;
import org.jvnet.hk2.annotations.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@AllArgsConstructor
class RegistrationController {

    private NewSequenceRegistrationService registrationService;

    @GetMapping("/user/registration")
    public User register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
}