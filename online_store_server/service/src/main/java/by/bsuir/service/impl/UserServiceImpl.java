package by.bsuir.service.impl;

import by.bsuir.entity.Basket;
import by.bsuir.entity.Role;
import by.bsuir.entity.SupportedAuthProvider;
import by.bsuir.entity.User;
import by.bsuir.repository.RoleRepository;
import by.bsuir.repository.UserRepository;
import by.bsuir.security.dto.SignUpRequest;
import by.bsuir.service.UserService;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.UpdateUserDto;
import by.bsuir.service.dto.UserDto;
import by.bsuir.service.dto.mapper.UserMapper;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.notNull;

@Service
@Qualifier("userService")
public class UserServiceImpl implements UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(RoleRepository roleRepository,
                           UserRepository userRepository,
                           UserMapper userMapper,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserDto signUp(SignUpRequest signUpRequest) {
        UserDto userDto = new UserDto();
        userDto.setName(signUpRequest.getName());
        userDto.setEmail(signUpRequest.getEmail());
        userDto.setProvider(SupportedAuthProvider.local);
        userDto.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userDto.setImageUrl(signUpRequest.getImageUrl());

        return this.save(userDto);
    }

    @Override
    @Transactional
    public UserDto save(UserDto userDto) {
        userRepository.findByEmail(userDto.getEmail())
                .ifPresent(value -> {
                            throw new ServiceException("Email address " + value.getEmail() + " already in use.");
                        }
                );
        User userToSave = userMapper.toEntity(userDto);

        Role role = roleRepository.findByName("ROLE_USER");
        userToSave.setRoles(Collections.singleton(role));

        User saved = userRepository.save(userToSave);
        Basket basket = new Basket();

        basket.setUser(saved);
        saved.setBasket(basket);

        return userMapper.toDto(saved);
    }


    @Override
    @Transactional
    public UserDto update(UserDto userDto) {
        User prevUser = userRepository.findById(userDto.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(userDto.getId())
                );
        User user = userMapper.toEntity(userDto);
        user.setRoles(prevUser.getRoles());
        user.setBasket(prevUser.getBasket());
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserDto updateUserProfile(UpdateUserDto updateUserDto) {
        User prevUser = userRepository.findById(updateUserDto.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(updateUserDto.getId())
                );
        prevUser.setName(updateUserDto.getName());
        prevUser.setEmail(updateUserDto.getEmail());
        prevUser.setImageUrl(updateUserDto.getImageUrl());
        return userMapper.toDto(userRepository.save(prevUser));
    }

    @Transactional
    @Override
    public UserDto findById(Long id) {
        notNull(id, "Id can`t be null!");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return userMapper.toDto(user);
    }

    @Transactional
    @Override
    public Optional<UserDto> findByEmail(String email) {
        notNull(email, "Email can`t be null!");
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(userMapper::toDto);
    }

    @Transactional
    @Override
    public Boolean existsByEmail(String email) {
        notNull(email, "Email can`t be null!");
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<UserDto> findAll(Paging paging) {

        Pageable pageable = PageRequest.of(paging.getPage(), paging.getSize());
        //   return userMapper.toDtoList(userRepository.findAll(paging.getSize(), paging.defineStartPosition()));
        return null;
    }

    @Override
    public void delete(Long id) {
        throw new UnsupportedOperationException("Delete method does not supported!");
    }
}
