package by.bsuir.service.dto.basket;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class UpdateProductBasketDto implements Serializable {
    private Long userId;
    @NotNull(message = "productId must be set")
    private Long productId;
    @NotNull(message = "product quantity must be set")
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
