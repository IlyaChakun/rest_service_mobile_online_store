package by.bsuir.service.dto.basket;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class AddProductBasketDto implements Serializable {
    private Long userId;
    @NotNull(message = "productId must be set")
    private Long productId;

    public AddProductBasketDto() {
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
}
