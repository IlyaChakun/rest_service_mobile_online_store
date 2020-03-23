package by.bsuir.service;

import by.bsuir.service.dto.basket.BasketDto;
import by.bsuir.service.dto.basket.AddProductBasketDto;
import by.bsuir.service.dto.basket.UpdateProductBasketDto;

public interface BasketService {

    BasketDto addProduct(AddProductBasketDto addProductBasketDto);

    BasketDto deleteProduct(AddProductBasketDto addProductBasketDto);

    BasketDto updateProduct(UpdateProductBasketDto updateProductBasketDto);

    BasketDto findAll(Long userId);

}
