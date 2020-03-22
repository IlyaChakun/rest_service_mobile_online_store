package by.bsuir.service.dto.basket;

import by.bsuir.service.dto.ProductDto;

import java.io.Serializable;

public class CountedProductBasketDto implements Serializable {

    private ProductDto product;
    private Integer quantity;

    public CountedProductBasketDto(ProductDto product, Integer quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
