package com.newsequence.api.repository;

import com.newsequence.api.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role,Long> {

    @Query("FROM Role WHERE name=:name")
    String findByName(@Param("name") String name);
}