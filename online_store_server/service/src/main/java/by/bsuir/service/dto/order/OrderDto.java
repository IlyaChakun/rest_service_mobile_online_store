package by.bsuir.service.dto.order;

import by.bsuir.entity.OrderDeliveryType;
import by.bsuir.service.dto.AbstractDto;
import by.bsuir.service.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto extends AbstractDto {

    private UserDto user;
    private BigDecimal price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    private LocalDateTime dateOfPurchase;
    private OrderDeliveryType deliveryType;
    private List<CountedOrderDto> orderProducts;
    private Integer totalElements;


    public OrderDto() {
    }

    public OrderDto(UserDto user,
                    BigDecimal price,
                    LocalDateTime dateOfPurchase,
                    OrderDeliveryType deliveryType,
                    List<CountedOrderDto> orderProducts,
                    Integer totalElements) {
        this.user = user;
        this.price = price;
        this.dateOfPurchase = dateOfPurchase;
        this.deliveryType = deliveryType;
        this.orderProducts = orderProducts;
        this.totalElements = totalElements;
    }


    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
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

    public List<CountedOrderDto> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<CountedOrderDto> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public Integer getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Integer totalElements) {
        this.totalElements = totalElements;
    }
}
