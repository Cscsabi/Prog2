package com.newsequence.api.service.impl;

import com.newsequence.api.model.Role;
import com.newsequence.api.repository.RoleRepository;
import com.newsequence.api.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NewSequenceRoleService implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }
}
