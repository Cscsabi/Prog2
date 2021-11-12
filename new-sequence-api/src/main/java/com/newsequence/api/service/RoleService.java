package com.newsequence.api.service;

import com.newsequence.api.model.Role;

public interface RoleService {

    Role findByName(String name);
}
