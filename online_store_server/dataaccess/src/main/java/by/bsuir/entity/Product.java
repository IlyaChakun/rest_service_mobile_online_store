package by.bsuir.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product extends AbstractEntity {

    @Column(name = "name", length = 64, nullable = false, unique = true)
    private String name;
    @Column(name = "description", length = 128)
    private String description;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "date_of_creation", nullable = false)
    private LocalDate dateOfCreation;
    @Column(name = "date_of_modification", nullable = false)
    private LocalDate dateOfModification;
    @Column(name = "count_available", nullable = false)
    private Integer countAvailable;
    @ManyToOne(fetch = FetchType.LAZY)
    private Brand brand;
    @ManyToMany(mappedBy = "orderProducts", fetch = FetchType.LAZY)
    private Set<Order> ordersWithProduct = new HashSet<>();
    @Column(name = "image_url", length = 900_000)
    private String imageUrl;

    public Product() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public LocalDate getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(LocalDate dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public LocalDate getDateOfModification() {
        return dateOfModification;
    }

    public void setDateOfModification(LocalDate dateOfModification) {
        this.dateOfModification = dateOfModification;
    }

    public Integer getCountAvailable() {
        return countAvailable;
    }

    public void setCountAvailable(Integer countAvailable) {
        this.countAvailable = countAvailable;
    }

    public Set<Order> getOrdersWithProduct() {
        return ordersWithProduct;
    }

    public void setOrdersWithProduct(Set<Order> ordersWithProduct) {
        this.ordersWithProduct = ordersWithProduct;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
        return "Product{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", dateOfCreation=" + dateOfCreation +
                ", dateOfModification=" + dateOfModification +
                ", isAvailable=" + countAvailable +
                ", brand=" + brand +
                ", ordersWithProduct=" + ordersWithProduct +
                '}';
    }
}
