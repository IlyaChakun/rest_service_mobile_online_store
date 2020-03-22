package by.bsuir.repository;


import by.bsuir.entity.Order;
import by.bsuir.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    Page<Order> findAllByUser(Pageable pageable, User user);

}
