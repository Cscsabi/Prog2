package com.newsequence.api.model;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class UserResponse implements Serializable  {

    @Serial
    private static final long serialVersionUID = -1800429855889567965L;

    private String emailAddress;
    private String lastName;
    private String firstName;
    private List<String> authorities;

    public UserResponse() {
    }

    public UserResponse(String emailAddress, String lastName, String firstName, List<String> authorities) {
        this.emailAddress = emailAddress;
        this.lastName = lastName;
        this.firstName = firstName;
        this.authorities = authorities;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }
}
