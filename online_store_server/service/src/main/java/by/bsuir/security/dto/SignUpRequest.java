package by.bsuir.security.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class SignUpRequest {

    @NotBlank(message = "Name can`t be null or spaces")
    @Pattern(regexp = ".{5,30}", message = "Name can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String name;

    @NotBlank(message = "email can`t be null or spaces")
    @Email(message = "Email should be correct!")
    private String email;

    @NotBlank(message = "Password can`t be null or spaces")
    @Pattern(regexp = ".{5,30}", message = "Pass can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String password;

    @NotBlank(message = "Confirmed password can`t be null or spaces!")
    @Pattern(regexp = ".{5,30}", message = "Confirmed pass can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String confirmedPassword;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }
}
