package by.bsuir.security.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


public class LoginRequest {

    @NotBlank(message = "email can`t be null or spaces")
    @Email(message = "Email should be correct!")
    private String email;

    @NotBlank(message = "Password can`t be null or spaces")
    private String password;

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
}
