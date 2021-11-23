package com.newsequence.api.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "Authorities")
@SequenceGenerator(name="authority_seq")
public class Authority implements GrantedAuthority, Serializable {

    @Serial
    private static final long serialVersionUID = 5050882203979289686L;

    public static final String USER = "USER";
    public static final String ADMIN = "ADMIN";

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="authority_seq")
    private Long authorityId;

    private String authority;

    public Long getAuthorityId() {
        return authorityId;
    }

    public String getAuthority() {
        return authority;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setAuthorityId(Long authorityId) {
        this.authorityId = authorityId;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Authority(Long authorityId, String authority, Set<User> users) {
        this.authorityId = authorityId;
        this.authority = authority;
        this.users = users;
    }

    public Authority(String authority) {
        this.authority = authority;
    }

    public Authority() {}

    @ManyToMany(mappedBy = "authorities")
    private Set<User> users;
}
