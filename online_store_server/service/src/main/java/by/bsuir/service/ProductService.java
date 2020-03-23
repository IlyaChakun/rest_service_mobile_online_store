package by.bsuir.service;

import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto save(ProductDto productDto);

    ProductDto update(ProductDto productDto);

    void delete(Long id);

    ProductDto findById(Long id);

    PageWrapper<ProductDto> findAll(Paging paging,
                                    List<String> brands,
                                    Double minPrice,
                                    Double maxPrice,
                                    String productName,
                                    String sortBy,
                                    String sortType);
}
