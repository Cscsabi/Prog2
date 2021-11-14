package com.newsequence.api.controller;

import com.newsequence.api.config.JwtTokenProvider;
import com.newsequence.api.model.Book;
import com.newsequence.api.model.User;
import com.newsequence.api.repository.RoleRepository;
import com.newsequence.api.repository.UserRepository;
import com.newsequence.api.resource.impl.NewSequenceUserResource;
import com.newsequence.api.service.UserService;
import com.newsequence.api.utils.ConstantUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/users")
public class UserController {
/*
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
        //TODO: registration ??
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody() User user) {
        //TODO: login ??
        return userService.login(user.getEmailAddress(), user.getPassword());
    }
*/
    private static Logger log = LoggerFactory.getLogger(NewSequenceUserResource.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        log.info("UserResourceImpl : register");
        JSONObject jsonObject = new JSONObject();
        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole("user");
            User savedUser = userRepository.saveAndFlush(user);
            jsonObject.put("message", savedUser.getFirstName() + " " + savedUser.getLastName() + " saved succesfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody User user) {
        log.info("UserResourceImpl : authenticate");
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                String email = user.getEmailAddress();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                jsonObject.put("token", tokenProvider.createToken(email, userRepository.findByEmail(email).getRole()));
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
}