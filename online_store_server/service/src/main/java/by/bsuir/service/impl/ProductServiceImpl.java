package by.bsuir.service.impl;

import by.bsuir.entity.Brand;
import by.bsuir.entity.Product;
import by.bsuir.repository.BrandRepository;
import by.bsuir.repository.ProductRepository;
import by.bsuir.service.ProductService;
import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.ProductDto;
import by.bsuir.service.dto.ProductSearchCriteriaDto;
import by.bsuir.service.dto.mapper.ProductMapper;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static by.bsuir.repository.specification.ProductSpecification.*;
import static org.springframework.util.Assert.notNull;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final BrandRepository brandRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              ProductMapper productMapper,
                              BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.brandRepository = brandRepository;
    }

    @Transactional
    @Override
    public ProductDto save(ProductDto productDto) {

        productRepository.findByName(productDto.getName())
                .ifPresent(value -> {
                    throw new ServiceException("Sorry, but product with name="
                            + value.getName() + " is already present! Just modify previous version.");
                });

        Product product = productMapper.toEntity(productDto);
        product.setDateOfCreation(LocalDateTime.now());
        product.setBrand(resolveBrand(product.getBrand()));

        return productMapper.toDto(productRepository.save(product));
    }

    @Transactional
    @Override
    public ProductDto update(ProductDto productDto) {
        Product prevProduct = productRepository.findById(productDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(productDto.getId()));
        Product productForUpdate = productMapper.toEntity(productDto);
        productForUpdate.setDateOfCreation(prevProduct.getDateOfCreation());
        productForUpdate.setBrand(resolveBrand(productForUpdate.getBrand()));

        return productMapper.toDto(productRepository.save(productForUpdate));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        notNull(id, "Can`t delete, because productId is null");

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        if (!product.getOrdersWithProduct().isEmpty()) {
            throw new ServiceException("You can`t delete this product because it`s already "
                    + product.getOrdersWithProduct().size() + " orders with him!");
        }

        productRepository.delete(product);
    }

    @Override
    public ProductDto findById(Long id) {
        notNull(id, "Can`t delete, because id is null");
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return productMapper.toDto(product);
    }

    private Brand resolveBrand(Brand brand) {
        return Objects.isNull(brand) ? null :
                Objects.isNull(brand.getId()) ?
                        getPresentedBrandByNameOrAddAndReturn(brand) :
                        getPresentedBrandByIdOrThrowException(brand);
    }

    private Brand getPresentedBrandByIdOrThrowException(Brand brand) {
        return
                brandRepository.findById(brand.getId())
                        .orElseThrow(() -> new ResourceNotFoundException(brand.getId()));
    }

    private Brand getPresentedBrandByNameOrAddAndReturn(Brand brand) {
        return
                brandRepository.findByName(brand.getName())
                        .orElseGet(() -> brandRepository.save(brand));
    }

    @Override
    public PageWrapper<ProductDto> findAll(Paging paging, ProductSearchCriteriaDto productSearchCriteriaDto) {

        Pageable pageable = getPageable(paging, productSearchCriteriaDto.getSortBy(), productSearchCriteriaDto.getSortType());
        List<Brand> resolvedBrands = resolveBrands(productSearchCriteriaDto.getBrands());
        Specification<Product> specification =
                getProductSpecification(productSearchCriteriaDto.getProductName(),
                        resolvedBrands, productSearchCriteriaDto.getMinPrice(), productSearchCriteriaDto.getMaxPrice());
        Page<Product> page = productRepository.findAll(specification, pageable);
        return
                PageWrapper.of(
                        productMapper.toDtoList(page.toList()),
                        page.getTotalPages(),
                        page.getTotalElements(),
                        paging.getPage(),
                        page.getNumberOfElements());
    }

    private Specification<Product> getProductSpecification(String productName,
                                                           List<Brand> resolvedBrands,
                                                           Double minPrice,
                                                           Double maxPrice) {

        Specification<Product> specification =
                Specification
                        .where(findByProductNameLike(productName))
                        .and(findByBetweenProductPrice(minPrice, maxPrice));

        if (!resolvedBrands.isEmpty()) {
            specification = specification.and(findAllByBrands(resolvedBrands));
        }
        return specification;
    }

    private Pageable getPageable(Paging paging, String sortBy, String sortType) {
        Sort sort = sortType.equalsIgnoreCase("ASC") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();
        return PageRequest.of(paging.getPage(), paging.getSize(), sort);
    }

    private List<Brand> resolveBrands(List<String> brandNames) {
        return Objects.isNull(brandNames) ?
                Collections.emptyList() :
                brandNames.stream()
                        .map(brandName -> brandRepository.findByName(brandName)
                                .orElse(new Brand()))
                        .collect(Collectors.toList());
    }

}
