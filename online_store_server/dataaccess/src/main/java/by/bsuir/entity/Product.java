package by.bsuir.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private LocalDateTime dateOfCreation;

    @Column(name = "date_of_modification", nullable = false)
    private LocalDateTime dateOfModification;

    @Column(name = "count_available", nullable = false)
    private Integer countAvailable;

    @ManyToOne(fetch = FetchType.LAZY)
    private Brand brand;

    @Column(name = "image_url", length = 900_000)
    private String imageUrl;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(name = "operation_system", length = 32)
    private String operationSystem;

    @Column(name = "screen_size", length = 32)
    private String screenSize;

    @Column(name = "screen_resolution", length = 32)
    private String screenResolution;

    @Column(name = "flash_memory", length = 32)
    private String flashMemory;

    @Column(name = "memory_cart_support")
    private Boolean memoryCartSupport;

    @Column(name = "dust_and_moisture_protection")
    private Boolean dustAndMoistureProtection;

    @ManyToMany(mappedBy = "orderProducts", fetch = FetchType.LAZY)
    private Set<Order> ordersWithProduct = new HashSet<>();
    @ManyToMany(mappedBy = "basketProducts", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Basket> basketProducts = new HashSet<>();

    public Product() {
    }


    @PrePersist
    private void onCreate() {
        dateOfModification = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        dateOfModification = LocalDateTime.now();
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

    public LocalDateTime getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(LocalDateTime dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public LocalDateTime getDateOfModification() {
        return dateOfModification;
    }

    public void setDateOfModification(LocalDateTime dateOfModification) {
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

    public Set<Basket> getBasketProducts() {
        return basketProducts;
    }

    public void setBasketProducts(Set<Basket> basketProducts) {
        this.basketProducts = basketProducts;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getOperationSystem() {
        return operationSystem;
    }

    public void setOperationSystem(String operatingSystem) {
        this.operationSystem = operatingSystem;
    }

    public String getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(String screenSize) {
        this.screenSize = screenSize;
    }

    public String getScreenResolution() {
        return screenResolution;
    }

    public void setScreenResolution(String screenResolution) {
        this.screenResolution = screenResolution;
    }

    public String getFlashMemory() {
        return flashMemory;
    }

    public void setFlashMemory(String flashMemory) {
        this.flashMemory = flashMemory;
    }

    public Boolean getMemoryCartSupport() {
        return memoryCartSupport;
    }

    public void setMemoryCartSupport(Boolean memoryCartSupport) {
        this.memoryCartSupport = memoryCartSupport;
    }

    public Boolean getDustAndMoistureProtection() {
        return dustAndMoistureProtection;
    }

    public void setDustAndMoistureProtection(Boolean dustAndMoistureProtection) {
        this.dustAndMoistureProtection = dustAndMoistureProtection;
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
