package by.bsuir.service.dto.basket;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class UpdateProductBasketDto implements Serializable {

    @NotNull(message = "userId must be set")
    private Long userId;
    @NotNull(message = "productId must be set")
    private Long productId;
    @NotNull(message = "product quantity must be set")
    @Min(value = 0, message = "Quantity can`t be <0")
    @Max(value = 99, message = "Quantity can`t be bigger then 99")
    private Integer quantity;

    public UpdateProductBasketDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
