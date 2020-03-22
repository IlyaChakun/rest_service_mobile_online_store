package by.bsuir.service.dto.basket;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class BasketDto implements Serializable {

    private List<CountedProductBasketDto> products;
    private BigDecimal totalPrice;
    private Integer totalElements;

    public BasketDto(List<CountedProductBasketDto> products, BigDecimal totalPrice, Integer totalElements) {
        this.products = products;
        this.totalPrice = totalPrice;
        this.totalElements = totalElements;
    }

    public List<CountedProductBasketDto> getProducts() {
        return products;
    }

    public void setProducts(List<CountedProductBasketDto> products) {
        this.products = products;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Integer totalElements) {
        this.totalElements = totalElements;
    }
}
