package com.newsequence.api;

import com.newsequence.api.model.User;
import com.newsequence.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class NewSequenceApiApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Test
	void findAllUsers() {
	}

}
