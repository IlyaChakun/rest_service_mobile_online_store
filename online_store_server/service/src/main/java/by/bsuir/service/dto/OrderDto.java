package by.bsuir.service.dto;

import by.bsuir.entity.OrderDeliveryType;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderDto extends AbstractDto {

    @Valid
    private UserDto user;
    @Valid
    @NotNull(message = "Add at least one certificate!")
    private List<ProductDto> orderProducts = new ArrayList<>();
    @Null(message = "Price will calculate automatically!")
    private BigDecimal price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    @Null(message = "Date of purchase will set automatically!")
    private LocalDateTime dateOfPurchase;


    private OrderDeliveryType deliveryType;


    public OrderDto() {
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<ProductDto> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<ProductDto> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDateTime getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(LocalDateTime dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public OrderDeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(OrderDeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }
}
