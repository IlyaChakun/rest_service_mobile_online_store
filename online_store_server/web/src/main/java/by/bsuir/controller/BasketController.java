package by.bsuir.controller;

import by.bsuir.service.BasketService;
import by.bsuir.service.dto.basket.BasketDto;
import by.bsuir.service.dto.basket.ProductBasketDto;
import by.bsuir.service.dto.basket.UpdateProductBasketDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static by.bsuir.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;

@Controller
@RequestMapping("/users/{userId}/baskets")
@Validated
public class BasketController {

    private final BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<BasketDto> addProduct(@PathVariable("userId") Long userId,
                                                @RequestBody @Valid ProductBasketDto productBasketDto,
                                                BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        productBasketDto.setUserId(userId);
        BasketDto basketDto = basketService.addProduct(productBasketDto);

        return new ResponseEntity<>(
                basketDto, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping
    public ResponseEntity<BasketDto> updateProduct(@PathVariable("userId") Long userId,
                                                   @RequestBody @Valid UpdateProductBasketDto updateProductBasketDto,
                                                   BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        updateProductBasketDto.setUserId(userId);
        BasketDto basketDto = basketService.updateProduct(updateProductBasketDto);

        return new ResponseEntity<>(
                basketDto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping
    public ResponseEntity<BasketDto> deleteProduct(@PathVariable("userId") Long userId,
                                                   @RequestBody @Valid ProductBasketDto productBasketDto,
                                                   BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        productBasketDto.setUserId(userId);
        BasketDto basketDto = basketService.deleteProduct(productBasketDto);

        return new ResponseEntity<>(
                basketDto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<BasketDto> findBasket(@PathVariable("userId") Long userId) {
        BasketDto basketDto = basketService.findAll(userId);
        return new ResponseEntity<>(
                basketDto, HttpStatus.OK);
    }
}
