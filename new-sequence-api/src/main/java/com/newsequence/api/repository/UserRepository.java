package com.newsequence.api.repository;

import com.newsequence.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmailAddress(String email);

    User getByEmailAddress(String email);

}