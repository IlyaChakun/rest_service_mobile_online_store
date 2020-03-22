package by.bsuir.service.impl;

import by.bsuir.entity.Brand;
import by.bsuir.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {


//    public static Specification<Product> isLongTermCustomer() {
//        return new Specification<Product>() {
//            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query,
//                                         CriteriaBuilder builder) {
//
//
//                return builder.lessThan(root.get(_Product.createdAt));
//            }
//        };
//    }

//    public static Specification<Product> getClear(Brand brand) {
//        return new Specification<Product>() {
//            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query,
//                                         CriteriaBuilder builder) {
//
//
//                return builder;
//            }
//        };
//    }

//
//    @Override
//    public Predicate toPredicate(Root root, CriteriaQuery criteriaQuery, CriteriaBuilder criteriaBuilder) {
//        List<Predicate> predicates = buildPredicates(root, criteriaQuery, criteriaBuilder);
//        return predicates.size() > 1
//                ? criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]))
//                : predicates.get(0);
//    }

    public static Specification<Product> findAllByBrands(List<Brand> brands) {

        return (Specification<Product>) (root, query, builder) -> {

            List<Predicate> predicates = buildPredicates(root, builder, brands);
//            return predicates.size() > 1
//                    ? builder.or(predicates.toArray(new Predicate[predicates.size()]))
//                    : predicates.get(0);
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


    public static Specification<Product> findByProductPrice(Double price) {
        return (Specification<Product>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .between(root.get("price"), price, price);
    }




}

