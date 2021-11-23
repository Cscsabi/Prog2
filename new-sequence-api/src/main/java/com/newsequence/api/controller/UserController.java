package com.newsequence.api.controller;

import com.newsequence.api.model.AuthRequest;
import com.newsequence.api.model.Authority;
import com.newsequence.api.model.User;
import com.newsequence.api.model.UserResponse;
import com.newsequence.api.service.UserService;
import com.newsequence.api.utils.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, JwtTokenUtils jwtTokenUtils, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtTokenUtils = jwtTokenUtils;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserResponse> register(@RequestBody AuthRequest request) {
        // TODO: validate user entity (password policy, etc.)
        try {
            User savedUser = this.userService.register(request);
            UserResponse userResponse = new UserResponse(
                    savedUser.getEmailAddress(),
                    savedUser.getLastName(),
                    savedUser.getFirstName(),
                    savedUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())
            );

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUtils.generateAccessToken(savedUser)
                    )
                    .body(userResponse);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<UserResponse> authenticate(@RequestBody  @Valid AuthRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );

            User user = (User) authentication.getPrincipal();
            UserResponse userResponse = new UserResponse(
                user.getEmailAddress(),
                user.getLastName(),
                user.getFirstName(),
                user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())
            );


            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUtils.generateAccessToken(user)
                    )
                    .body(userResponse);
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password!");
        }
    }

    @GetMapping(value = "/get")
    @Secured({ Authority.USER, Authority.ADMIN })
    public ResponseEntity<User> getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //TODO: test it, as this is probably not needed
        if(auth == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User not authenticated!");
        }

        Optional<User> user = userService.findByEmail(auth.getName());
        if(user.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User email is non existent!");
        }
        // sanitize private data -> if expanded create a function for it
        user.get().setPassword(null);

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
}