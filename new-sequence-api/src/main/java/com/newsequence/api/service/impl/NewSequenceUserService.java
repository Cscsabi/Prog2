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


    //private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    public NewSequenceUserService(UserRepository userRepository) { //, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        //this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User register(User user) {
        boolean userExists = userRepository.findById(user.getId()).isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        //String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        String encodedPassword = user.getPassword();
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return user;

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
/*
    @PostMapping("/user/registration")
    public ModelAndView registerUserAccount(
            @ModelAttribute("user") @Valid UserDto userDto,
            HttpServletRequest request,
            Errors errors) {

        try {
            User registered = userService.registerNewUserAccount(userDto);
        } catch (UserAlreadyExistException uaeEx) {
            mav.addObject("message", "An account for that username/email already exists.");
            return mav;
        }

        // rest of the implementation
    }*/
}
