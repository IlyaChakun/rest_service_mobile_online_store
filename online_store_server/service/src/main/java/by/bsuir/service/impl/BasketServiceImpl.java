package by.bsuir.service.impl;

import by.bsuir.entity.Basket;
import by.bsuir.entity.Product;
import by.bsuir.entity.User;
import by.bsuir.repository.BasketRepository;
import by.bsuir.repository.ProductRepository;
import by.bsuir.repository.UserRepository;
import by.bsuir.service.BasketService;
import by.bsuir.service.dto.basket.BasketDto;
import by.bsuir.service.dto.basket.CountedProductBasketDto;
import by.bsuir.service.dto.basket.ProductBasketDto;
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
    private final BasketRepository basketRepository;


    @Autowired
    public BasketServiceImpl(UserRepository userRepository,
                             ProductRepository productRepository,
                             ProductMapper productMapper,
                             BasketRepository basketRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.basketRepository = basketRepository;
    }

    @Transactional
    @Override
    public BasketDto addProduct(ProductBasketDto productBasketDto) {
        User user = findUserById(productBasketDto.getUserId());
        Product product = resolveProduct(productBasketDto.getProductId());

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
    public BasketDto deleteProduct(ProductBasketDto productBasketDto) {
        User user = findUserById(productBasketDto.getUserId());
        Product product = findProductById(productBasketDto.getProductId());

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


//        basketRepository.save(basket);
//
//        if (previousQuantity > updateProductBasketDto.getQuantity()) {
//            basketProducts.remove(product);
//            basket.setTotalPrice(previousTotalPrice.subtract(product.getPrice()));
//        } else {
//            basketProducts.add(product);
//            basket.setTotalPrice(previousTotalPrice.add(product.getPrice()));
//        }

        return buildCountedProductList(basketProducts);
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
        Map<Product, Integer> productQuantityMap = new HashMap<>();//TODO
        products.forEach(product -> productQuantityMap.put(product, Collections.frequency(products, product)));

        BigDecimal totalPrice = calculateTotalPrice(products);
        int totalElements = products.size();

        List<CountedProductBasketDto> countedProductsList = productQuantityMap
                .entrySet()
                .stream()
                .map((obj) -> new CountedProductBasketDto(productMapper.toDto(obj.getKey()), obj.getValue()))
                .collect(Collectors.toList());


        return new BasketDto(countedProductsList, totalPrice, totalElements);
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
