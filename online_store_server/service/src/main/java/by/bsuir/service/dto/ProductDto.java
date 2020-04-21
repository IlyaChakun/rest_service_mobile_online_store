package by.bsuir.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    private LocalDateTime dateOfCreation;
    @Null(message = "Date of modification will set automatically!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    private LocalDateTime dateOfModification;
    @NotNull(message = "Product count must be set!")
    @Min(value = 0, message = "Product count can`t be < 0")
    @Max(value = 5000, message = "Product count can`t be bigger then 5000!")
    private Integer countAvailable;
    @Valid
    @NotNull(message = "Brand must be set!")
    private BrandDto brand;

    private String imageUrl;

    @Min(value = 2010, message = "Choose year that bigger then 2010")
    private Integer releaseYear;
    @NotBlank(message = "Release year can`t be null and spaces!")
    private String operationSystem;
    @NotBlank(message = "Operation system can`t be null and spaces!")
    private String screenSize;
    @NotBlank(message = "Screen size can`t be null and spaces!")
    private String screenResolution;
    @NotBlank(message = "Screen resolution can`t be null and spaces!")
    private String flashMemory;
    @NotNull(message = "Choose memory card support!")
    private Boolean memoryCartSupport;
    @NotNull(message = "Choose dust and moisture protection")
    private Boolean dustAndMoistureProtection;


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

    public String getOperationSystem() {
        return operationSystem;
    }

    public void setOperationSystem(String operationSystem) {
        this.operationSystem = operationSystem;
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

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }
}
