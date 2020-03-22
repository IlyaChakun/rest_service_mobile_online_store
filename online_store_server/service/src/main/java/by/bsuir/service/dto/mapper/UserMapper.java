package by.bsuir.service.dto.mapper;

import by.bsuir.entity.User;
import by.bsuir.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends AbstractMapper<User, UserDto> {

    @Autowired
    public UserMapper() {
        super(User.class, UserDto.class);
    }

}