package by.bsuir.service.dto;

import by.bsuir.entity.OrderDeliveryType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderCreateDto {

    @NotNull(message = "User id must be set!")
    private Long userId;

    private OrderDeliveryType deliveryType = OrderDeliveryType.PICKUP;

    public OrderCreateDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public OrderDeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(OrderDeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }
}
