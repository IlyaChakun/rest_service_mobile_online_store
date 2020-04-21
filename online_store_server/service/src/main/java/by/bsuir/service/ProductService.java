package by.bsuir.service;

import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.ProductDto;
import by.bsuir.service.dto.ProductSearchCriteriaDto;

public interface ProductService {

    ProductDto save(ProductDto productDto);

    ProductDto update(ProductDto productDto);

    void delete(Long id);

    ProductDto findById(Long id);

    PageWrapper<ProductDto> findAll(Paging paging, ProductSearchCriteriaDto productSearchCriteriaDto);
}
