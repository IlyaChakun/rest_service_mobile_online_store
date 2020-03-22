package by.bsuir.service.dto;

import by.bsuir.entity.SupportedAuthProvider;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto extends AbstractDto {

    private String name;
    @JsonIgnore
    private String password;
    private String email;
    private String imageUrl;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    private LocalDateTime lastVisit;
    private SupportedAuthProvider provider;
    private List<RoleDto> roles = new ArrayList<>();


    public UserDto() {
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
        return Objects.isNull(imageUrl) ? "" : imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(LocalDateTime lastVisit) {
        this.lastVisit = lastVisit;
    }

    public SupportedAuthProvider getProvider() {
        return provider;
    }

    public void setProvider(SupportedAuthProvider provider) {
        this.provider = provider;
    }

    public List<RoleDto> getRoles() {
        return roles.isEmpty() ? Collections.emptyList() : roles;
    }

    public void setRoles(List<RoleDto> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                super.toString() +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", lastVisit=" + lastVisit +
                ", provider=" + provider +
                ", roleNames=" + roles +
                '}';
    }
}
