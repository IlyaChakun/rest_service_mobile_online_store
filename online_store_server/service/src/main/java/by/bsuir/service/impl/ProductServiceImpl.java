package by.bsuir.service.impl;

import by.bsuir.entity.Brand;
import by.bsuir.entity.Product;
import by.bsuir.repository.BrandRepository;
import by.bsuir.repository.ProductRepository;
import by.bsuir.service.ProductService;
import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.ProductDto;
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

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static by.bsuir.service.impl.ProductSpecification.findAllByBrands;
import static by.bsuir.service.impl.ProductSpecification.findByProductNameLike;
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
                    throw new ServiceException("Sorry, but product with name=" + value.getName() + " is already present! Just modify previous version.");
                });

        Product product = productMapper.toEntity(productDto);
        product.setDateOfModification(LocalDate.now());
        product.setDateOfCreation(LocalDate.now());
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
        productForUpdate.setDateOfModification(LocalDate.now());
        productForUpdate.setBrand(resolveBrand(productForUpdate.getBrand()));

        return productMapper.toDto(productRepository.save(productForUpdate));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        notNull(id, "Can`t delete, because productId is null");
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

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
    public PageWrapper<ProductDto> findAll(Paging paging,
                                           List<String> brands,
                                           Double price,
                                           String productName,
                                           String sortBy,
                                           String sortType) {

        //1
        Sort sort = sortType.equals("ASC") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(paging.getPage(), paging.getSize(), sort);

        //2
        List<Brand> resolvedBrands = resolveBrands(brands);

        //3
//        Specification<Product> specification =
//                Specification.where((ProductSpecification.findAllByBrands(resolvedBrands)))
//                        .and(findByProductNameLike(productName));
        //costil`
        Specification<Product> specification =
                Specification.where(findByProductNameLike(productName));
        if (!resolvedBrands.isEmpty()) {
            specification = specification.and(findAllByBrands(resolvedBrands));
        }

        //4
        Page<Product> page = productRepository.findAll(specification, pageable);

        return
                PageWrapper.of(
                        productMapper.toDtoList(page.toList()),
                        page.getTotalPages(),
                        page.getTotalElements(),
                        paging.getPage(),
                        page.getNumberOfElements());
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
