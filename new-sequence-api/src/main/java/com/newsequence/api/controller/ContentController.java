package com.newsequence.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ContentController {

    @RequestMapping ("/")
    public String welcome(Model model) {
        model.addAttribute("message", "Welcome to Spring Boot!");
        //model.addAttribute("user";
        return "index";
    }
}
