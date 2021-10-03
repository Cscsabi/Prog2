package com.newsequence.api.controller;

import com.newsequence.api.model.User;
import com.newsequence.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable(value = "id") Long userId) {
        return this.userService.getUser(userId);
    }

    @PostMapping()
    public User register(@RequestBody() User user) {
        //TODO: registration
        return null;
    }

    @PostMapping("/login")
    public User login(@RequestBody() User user) {
        //TODO: login
        return null;
    }
}