package by.bsuir.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDto extends AbstractDto {

    @NotBlank(message = "Name can`t be null and spaces!")
    @Pattern(regexp = ".{5,64}", message = "Name must be more then 5 symbols, but smaller than 64 ")
    private String name;
    @Pattern(regexp = ".{0,512}")
    private String description;
    @NotNull(message = "Price can`t be null")
    @Min(value = 0, message = "Price can`t be < 0")
    @Max(value = 10_000, message = "Price must be smaller then 1_000_000")
    private BigDecimal price;
    @Null(message = "Date of creation will set automatically!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfCreation;
    @Null(message = "Date of modification will set automatically!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfModification;
    @NotNull(message = "Product count must be set!")
    @Min(value = 0, message = "Product count can`t be < 0")
    @Max(value = 5000, message = "Product count can`t be bigger then 5000!")
    private Integer countAvailable;
    @Valid
    private BrandDto brand;

    private String imageUrl;

    public ProductDto() {
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

    public BrandDto getBrand() {
        return brand;
    }

    public void setBrand(BrandDto brand) {
        this.brand = brand;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
