package by.bsuir.service;

import by.bsuir.security.dto.SignUpRequest;
import by.bsuir.service.dto.UpdateUserDto;
import by.bsuir.service.dto.UserDto;

import java.util.Optional;

public interface UserService extends CrudService<UserDto> {

    UserDto updateUserProfile(UpdateUserDto updateUserDto);

    Optional<UserDto> findByEmail(String email);

    Boolean existsByEmail(String email);

    UserDto signUp(SignUpRequest signUpRequest);
}
