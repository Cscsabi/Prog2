package com.newsequence.api.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class AuthRequest {

    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;

    @NotNull
    private String last;

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    @NotNull
    private String first;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthRequest(String username, String password, String last, String first) {
        this.username = username;
        this.password = password;
        this.last = last;
        this.first = first;
    }

    public AuthRequest() {
    }
}
