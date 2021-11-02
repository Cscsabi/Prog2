package com.newsequence.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("message", "Hello World!");
        //model.addAttribute("user";
        return "helloworld";
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("message", "W");
        //model.addAttribute("user";
        return "index";
    }
}
