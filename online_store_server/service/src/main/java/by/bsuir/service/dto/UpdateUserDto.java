package by.bsuir.service.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateUserDto extends AbstractDto {


    @NotBlank(message = "Name can`t be null or spaces")
    @Pattern(regexp = ".{5,30}", message = "Name can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String name;

    @NotBlank(message = "email can`t be null or spaces")
    @Email(message = "Email should be correct!")
    private String email;

    private String imageUrl;

    public UpdateUserDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
