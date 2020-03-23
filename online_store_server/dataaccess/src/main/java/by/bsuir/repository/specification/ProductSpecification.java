package by.bsuir.repository.specification;

import by.bsuir.entity.Brand;
import by.bsuir.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public final class ProductSpecification {

    private ProductSpecification() {
    }

    public static Specification<Product> findAllByBrands(List<Brand> brands) {
        return (Specification<Product>) (root, query, builder) -> {
            List<Predicate> predicates = buildPredicates(root, builder, brands);
            return
                    builder.or(predicates.toArray(new Predicate[predicates.size()]));

        };
    }

    private static List<Predicate> buildPredicates(Root<Product> root,
                                                   CriteriaBuilder criteriaBuilder,
                                                   List<Brand> brands) {
        List<Predicate> predicates = new ArrayList<>();
        brands.forEach(brand -> predicates.add(
                criteriaBuilder.equal(
                        root.join("brand").get("name"), brand.getName())));
        return predicates;
    }


    public static Specification<Product> findByProductNameLike(String productName) {
        return (Specification<Product>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("name"), '%' + productName + '%');
    }


    public static Specification<Product> findByBetweenProductPrice(Double minPrice, Double maxPrice) {
        return (Specification<Product>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .between(root.get("price"), minPrice, maxPrice);
    }


}

