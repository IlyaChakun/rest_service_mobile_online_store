package by.bsuir.service.dto.mapper;

import by.bsuir.entity.Product;
import by.bsuir.service.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper extends AbstractMapper<Product, ProductDto> {

    @Autowired
    public ProductMapper() {
        super(Product.class, ProductDto.class);
    }

}

