package com.newsequence.api.model;

import javax.persistence.*;

@Entity
@Table(name = "Users")
@SequenceGenerator(name="user_seq")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    public String role;

    public User() {}

    public User(Long id, String emailAddress, String lastName, String firstName, String password, String role) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.lastName = lastName;
        this.firstName = firstName;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}