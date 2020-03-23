package by.bsuir.repository;


import by.bsuir.entity.Order;
import by.bsuir.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    Page<Order> findAllByUser(Pageable pageable, User user);

    Optional<Order> findByIdAndUserId(Long id, Long userId);
}
