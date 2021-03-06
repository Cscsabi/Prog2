package com.newsequence.api.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController implements ErrorController {
    private static final String PATH = "/error";

    public String getErrorPath() {
        return PATH;
    }

    @RequestMapping("/error")
    public String error() {
        return "No mapping available.";
    }
}
