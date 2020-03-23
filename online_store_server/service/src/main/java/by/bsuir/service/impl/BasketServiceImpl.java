package by.bsuir.service.impl;

import by.bsuir.entity.Basket;
import by.bsuir.entity.Product;
import by.bsuir.entity.User;
import by.bsuir.repository.ProductRepository;
import by.bsuir.repository.UserRepository;
import by.bsuir.service.BasketService;
import by.bsuir.service.dto.basket.BasketDto;
import by.bsuir.service.dto.basket.CountedProductBasketDto;
import by.bsuir.service.dto.basket.AddProductBasketDto;
import by.bsuir.service.dto.basket.UpdateProductBasketDto;
import by.bsuir.service.dto.mapper.ProductMapper;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BasketServiceImpl implements BasketService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;


    @Autowired
    public BasketServiceImpl(UserRepository userRepository,
                             ProductRepository productRepository,
                             ProductMapper productMapper) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    @Override
    public BasketDto addProduct(AddProductBasketDto addProductBasketDto) {
        User user = findUserById(addProductBasketDto.getUserId());
        Product product = resolveProduct(addProductBasketDto.getProductId());

        Basket basket = user.getBasket();
        List<Product> basketProducts = basket.getBasketProducts();
        basketProducts.add(product);

        BigDecimal totalPrice = basket.getTotalPrice();
        basket.setTotalPrice(totalPrice.add(product.getPrice()));

        return buildCountedProductList(new ArrayList<>(basketProducts));
    }

    private Product resolveProduct(Long productId) {
        Product product = findProductById(productId);
        if (product.getCountAvailable() == 0) {
            throw new ServiceException("Product with name=" + product.getName() + " is unavailable now!");
        }
        return product;
    }

    @Transactional
    @Override
    public BasketDto deleteProduct(AddProductBasketDto addProductBasketDto) {
        User user = findUserById(addProductBasketDto.getUserId());
        Product product = findProductById(addProductBasketDto.getProductId());

        Basket basket = user.getBasket();
        List<Product> basketProducts = basket.getBasketProducts();

        int quantity = Collections.frequency(basketProducts, product);
        basketProducts.removeIf(basketProduct -> basketProduct.equals(product));

        BigDecimal previousTotalPrice = basket.getTotalPrice();
        BigDecimal newTotalPrice = previousTotalPrice.subtract(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        basket.setTotalPrice(newTotalPrice);


        return buildCountedProductList(basketProducts);
    }

    @Override
    @Transactional
    public BasketDto updateProduct(UpdateProductBasketDto updateProductBasketDto) {

        User user = findUserById(updateProductBasketDto.getUserId());
        Product product = findProductById(updateProductBasketDto.getProductId());

        Basket basket = user.getBasket();
        List<Product> basketProducts = basket.getBasketProducts();

        BigDecimal previousTotalPrice = basket.getTotalPrice();
        int previousQuantity = Collections.frequency(basketProducts, product);

        calculateBasketProductCount(updateProductBasketDto, product, basket, basketProducts, previousTotalPrice, previousQuantity);

        return buildCountedProductList(basketProducts);
    }

    private void calculateBasketProductCount(UpdateProductBasketDto updateProductBasketDto,
                                             Product product, Basket basket,
                                             List<Product> basketProducts,
                                             BigDecimal previousTotalPrice,
                                             int previousQuantity) {
        if (previousQuantity > updateProductBasketDto.getQuantity()) {
            for (int i = updateProductBasketDto.getQuantity(); previousQuantity != i; i++) {
                basketProducts.remove(product);
                basket.setTotalPrice(previousTotalPrice.subtract(product.getPrice()));
            }
        } else {
            for (int i = previousQuantity; updateProductBasketDto.getQuantity() != i; i++) {
                basketProducts.add(product);
                basket.setTotalPrice(previousTotalPrice.add(product.getPrice()));
            }
        }
    }

    @Transactional
    @Override
    public BasketDto findAll(Long userId) {
        User user = findUserById(userId);
        Basket basket = user.getBasket();
        List<Product> basketProducts = basket.getBasketProducts();
        return buildCountedProductList(basketProducts);
    }

    private BasketDto buildCountedProductList(List<Product> products) {
        Map<Product, Integer> productQuantityMap = getProductsMapWithQuantity(products);

        BigDecimal totalPrice = calculateTotalPrice(products);
        int totalElements = products.size();

        List<CountedProductBasketDto> countedProductsList = convertProductMapToListWithQuantity(productQuantityMap);

        return new BasketDto(countedProductsList, totalPrice, totalElements);
    }

    private List<CountedProductBasketDto> convertProductMapToListWithQuantity(Map<Product, Integer> productQuantityMap) {
        return productQuantityMap
                .entrySet()
                .stream()
                .map(obj -> new CountedProductBasketDto(productMapper.toDto(obj.getKey()), obj.getValue()))
                .collect(Collectors.toList());
    }

    private Map<Product, Integer> getProductsMapWithQuantity(List<Product> products) {
        Map<Product, Integer> productQuantityMap = new HashMap<>();
        products.forEach(product -> productQuantityMap.put(product, Collections.frequency(products, product)));
        return productQuantityMap;
    }

    private BigDecimal calculateTotalPrice(List<Product> products) {
        return products
                .stream()
                .map(Product::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No user with id=" + userId));
    }

    private Product findProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("No product with id=" + productId));
    }
}


