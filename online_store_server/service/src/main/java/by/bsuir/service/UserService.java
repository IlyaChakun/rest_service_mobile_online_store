package by.bsuir.service;

import by.bsuir.security.dto.SignUpRequest;
import by.bsuir.service.dto.UserDto;

import java.util.Optional;

public interface UserService extends CrudService<UserDto> {

    Optional<UserDto> findByEmail(String email);

    Boolean existsByEmail(String email);

    UserDto signUp(SignUpRequest signUpRequest);
}
