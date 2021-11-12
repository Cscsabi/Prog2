package com.newsequence.api.resource.impl;

import com.newsequence.api.model.User;
import com.newsequence.api.repository.RoleRepository;
import com.newsequence.api.repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.newsequence.api.config.JwtTokenProvider;
import com.newsequence.api.utils.ConstantUtils;


public class NewSequenceUserResource {

}
