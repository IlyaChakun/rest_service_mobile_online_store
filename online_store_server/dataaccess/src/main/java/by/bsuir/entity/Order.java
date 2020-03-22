package by.bsuir.entity;


import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order extends AbstractEntity {
    @ManyToOne(cascade = {
            CascadeType.MERGE
    })
    private User user;
    @ManyToMany(
            cascade = {
                    CascadeType.MERGE
            })
    @JoinTable(name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> orderProducts = new ArrayList<>();
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "date_of_purchase", nullable = false)
    private LocalDateTime dateOfPurchase;

    @Column(name = "delivery_type")
    @Enumerated(EnumType.STRING)
    private OrderDeliveryType deliveryType = OrderDeliveryType.PICKUP;


    public Order() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Product> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<Product> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal cost) {
        this.price = cost;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode());
    }

    @Override
    public String toString() {
        return "Order{" +
                "user=" + user +
                // ", orderProducts=" + orderProducts +
                ", cost=" + price +
                ", dateOfPurchase=" + dateOfPurchase +
                '}';
    }
}
