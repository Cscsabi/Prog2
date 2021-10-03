package com.newsequence.api.repository;

import com.newsequence.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface extends JpaRepository<User, Long>{}

