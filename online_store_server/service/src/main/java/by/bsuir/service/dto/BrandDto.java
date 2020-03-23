package by.bsuir.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BrandDto extends AbstractDto {

    @NotBlank(message = "Name can`t be null and spaces!")
    @Pattern(regexp = ".{3,64}", message = "Name must be more then 5 symbols, but smaller than 64 ")
    private String name;
    @Pattern(regexp = ".{0,512}", message = "Description can`t be bigger then 512 symbols")
    private String description;


    public BrandDto() {
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
}
