package com.newsequence.api.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User Not Found")
public class UserDoesNotExistException extends RuntimeException {
    private static final long serialVersionUID = 6175718891345457605L;
}
