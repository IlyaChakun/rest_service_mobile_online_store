package by.bsuir.service.dto.basket;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.io.Serializable;

public class ProductBasketDto implements Serializable {
    //@Null(message = "user id will set automatically")
    private Long userId;
    @NotNull(message = "productId must be set")
    private Long productId;

    public ProductBasketDto() {
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
