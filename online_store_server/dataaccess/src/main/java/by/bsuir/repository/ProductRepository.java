package by.bsuir.repository;

import by.bsuir.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

//    @Query("SELECT p FROM Product p WHERE p.name LIKE %:productName% AND p.brand.name = :brandName")
//    Page<Product> findAllWithProductAndBrand(Pageable pageable,
//                                             @Param("productName") String productName,
//                                             @Param("brandName") String brandName);


    Optional<Product> findByName(String name);
}
