package by.bsuir.controller;

import by.bsuir.exception.ControllerException;
import by.bsuir.security.CurrentUser;
import by.bsuir.security.UserPrincipal;
import by.bsuir.security.dto.SignUpRequest;
import by.bsuir.service.OrderService;
import by.bsuir.service.UserService;
import by.bsuir.service.dto.*;
import by.bsuir.service.dto.order.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

import static by.bsuir.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    private final OrderService orderService;
    private final UserService userService;

    @Autowired
    public UserController(OrderService orderService,
                          UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<UserDto> add(@RequestBody @Valid SignUpRequest signUpRequest,
                                       BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmedPassword())) {
            throw new ControllerException("The password you entered did not match the confirmed password!");
        }
        UserDto addedUser = userService.signUp(signUpRequest);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(addedUser.getId()).toUri());
        return new ResponseEntity<>(addedUser, httpHeaders, HttpStatus.CREATED);
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable("id") Long userId,
                                          @RequestBody @Valid UpdateUserDto updateUserDto,
                                          BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        updateUserDto.setId(userId);
        UserDto updated = userService.updateUserProfile(updateUserDto);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDto>> findAll(@RequestParam(defaultValue = "10", value = "size")
                                                 @Min(value = 1, message = "Min value for size is 1") Integer size,
                                                 @RequestParam(defaultValue = "1", value = "page")
                                                 @Min(value = 1, message = "Min value for page is 1") Integer page) {
        Paging paging = new Paging(size, page);
        return new ResponseEntity<>(userService.findAll(paging), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@CurrentUser UserPrincipal userPrincipal,
                                            @PathVariable @Positive(message = "Id must be positive!") Long id) {
        if (!userPrincipal.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userPrincipal.getId().equals(id)) {
            throw new AccessDeniedException("You have no permissions!");
        }
        UserDto user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok(userService.findById(userPrincipal.getId()));
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/{userId}/orders")
    public ResponseEntity<PageWrapper<OrderDto>> findAllUsersOrders(@PathVariable("userId") Long userId,
                                                                    @RequestParam(defaultValue = "10", value = "size")
                                                                    @Positive(message = "Id must be positive!") Integer size,
                                                                    @RequestParam(defaultValue = "0", value = "page") Integer page,
                                                                    @CurrentUser UserPrincipal userPrincipal) {
        if (!userPrincipal.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userPrincipal.getId().equals(userId)) {
            throw new AccessDeniedException("You have no permissions!");
        }
        Paging paging = new Paging(size, page);
        PageWrapper<OrderDto> orders = orderService.findAllByUserId(paging, userId);

        return new ResponseEntity<>(
                orders,
                HttpStatus.OK);
    }


}
