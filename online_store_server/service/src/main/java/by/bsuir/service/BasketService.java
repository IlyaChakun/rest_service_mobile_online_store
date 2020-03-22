package by.bsuir.service;

import by.bsuir.service.dto.basket.BasketDto;
import by.bsuir.service.dto.basket.ProductBasketDto;
import by.bsuir.service.dto.basket.UpdateProductBasketDto;

public interface BasketService {

    BasketDto addProduct(ProductBasketDto productBasketDto);

    BasketDto deleteProduct(ProductBasketDto productBasketDto);

    BasketDto updateProduct(UpdateProductBasketDto updateProductBasketDto);

    BasketDto findAll(Long userId);

}
