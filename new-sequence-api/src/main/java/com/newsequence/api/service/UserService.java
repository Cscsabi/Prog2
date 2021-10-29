package com.newsequence.api.service;

import com.newsequence.api.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

@Service
public interface UserService {

    User register(User user);

    User login(String email, String password);

    User getUser(Long id);
}
