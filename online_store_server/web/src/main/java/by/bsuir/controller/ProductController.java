package by.bsuir.controller;

import by.bsuir.service.ProductService;
import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.ProductDto;
import by.bsuir.service.dto.ProductSearchCriteriaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.util.List;

import static by.bsuir.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;

@Controller
@RequestMapping("/products")
@Validated
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ProductDto> add(@RequestBody @Valid ProductDto productDto,
                                          BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        ProductDto savedGiftCertificateDto = productService.save(productDto);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedGiftCertificateDto.getId()).toUri());
        return new ResponseEntity<>(savedGiftCertificateDto, httpHeaders, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable @Positive(message = "Id must be positive!") Long id,
                                             @RequestBody @Valid ProductDto productDto,
                                             BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        productDto.setId(id);

        return new ResponseEntity<>(productService.update(productDto),
                HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable @Positive(message = "Id must be positive!") Long id) {
        productService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable @Positive(message = "Id must be positive!") Long id) {
        return new ResponseEntity<>(
                productService.findById(id),
                HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<PageWrapper<ProductDto>> findAll(@RequestParam(value = "size", defaultValue = "10")
                                                           @Positive(message = "Id must be positive!") Integer size,
                                                           @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                           @RequestParam(value = "brands", required = false) List<String> brands,
                                                           @RequestParam(value = "minPrice", required = false, defaultValue = "0")
                                                           @Min(value = 0, message = "Price can`t be smaller then 0")
                                                           @Max(value = 10_000, message = "Price can`t be bigger then 10_000") Double minPrice,
                                                           @RequestParam(value = "maxPrice", required = false, defaultValue = "10000")
                                                           @Min(value = 0, message = "Price can`t be smaller then 0")
                                                           @Max(value = 10_000, message = "Price can`t be bigger then 10_000") Double maxPrice,
                                                           @RequestParam(value = "productName", required = false, defaultValue = "")
                                                           @Pattern(regexp = ".{0,64}", message = "Product name can`t be bigger then 64 symbols") String productName,
                                                           @RequestParam(value = "sortBy", required = false, defaultValue = "price") String sortBy,
                                                           @RequestParam(value = "sortType", required = false, defaultValue = "ASC") String sortType) {
        Paging paging = new Paging(size, page);
        ProductSearchCriteriaDto searchCriteria = getSearchCriteria(brands, minPrice, maxPrice, productName, sortBy, sortType);
        PageWrapper<ProductDto> products = productService.findAll(paging, searchCriteria);
        return new ResponseEntity<>(
                products,
                HttpStatus.OK);
    }

    private ProductSearchCriteriaDto getSearchCriteria(List<String> brands,
                                                       Double minPrice, Double maxPrice,
                                                       String productName,
                                                       String sortBy, String sortType) {
        ProductSearchCriteriaDto productSearchCriteriaDto = new ProductSearchCriteriaDto();
        productSearchCriteriaDto.setBrands(brands);
        productSearchCriteriaDto.setMaxPrice(maxPrice);
        productSearchCriteriaDto.setMinPrice(minPrice);
        productSearchCriteriaDto.setProductName(productName);
        productSearchCriteriaDto.setSortBy(sortBy);
        productSearchCriteriaDto.setSortType(sortType);
        return productSearchCriteriaDto;
    }

}
