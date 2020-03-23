package by.bsuir.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    @Column(name = "password", length = 256)
    private String password;

    @Column(name = "name", length = 128)
    private String name;

    @Column(name = "email", length = 128, unique = true)
    private String email;

    @Column(name = "image_url", length = 1256)
    private String imageUrl;

    @Column(name = "last_visit", nullable = false)
    private LocalDateTime lastVisit;

    @Column(name = "provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private SupportedAuthProvider provider;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.MERGE
            })
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.MERGE
            })
    @JoinColumn(name = "user_id")
    private Set<Order> orders = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "basket_id", referencedColumnName = "id")
    private Basket basket;

    public User() {
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
        return imageUrl;
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

    public Set<Role> getRoles() {
        return roles.isEmpty() ? Collections.emptySet() : roles;
    }

    public void setRoles(Set<Role> role) {
        this.roles = role;
    }

    public Set<Order> getOrders() {
        return orders.isEmpty() ? Collections.emptySet() : orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
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
        return "User{" +
                super.toString() +
                "password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", lastVisit=" + lastVisit +
                ", provider=" + provider +
                ", role=" + roles +
                '}';
    }
}
