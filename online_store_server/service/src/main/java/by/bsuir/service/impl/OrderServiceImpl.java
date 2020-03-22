package by.bsuir.service.impl;

import by.bsuir.entity.Basket;
import by.bsuir.entity.Order;
import by.bsuir.entity.Product;
import by.bsuir.entity.User;
import by.bsuir.repository.BasketRepository;
import by.bsuir.repository.OrderRepository;
import by.bsuir.repository.ProductRepository;
import by.bsuir.repository.UserRepository;
import by.bsuir.service.OrderService;
import by.bsuir.service.dto.OrderCreateDto;
import by.bsuir.service.dto.OrderDto;
import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.mapper.OrderMapper;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final BasketRepository basketRepository;


    @Autowired
    public OrderServiceImpl(ProductRepository productRepository,
                            UserRepository userRepository,
                            OrderRepository orderRepository,
                            OrderMapper orderMapper,
                            BasketRepository basketRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.basketRepository = basketRepository;
    }

    @Override
    public OrderDto save(OrderCreateDto orderCreateDto) {

        User user = resolveUser(orderCreateDto.getUserId());
        Basket basket = user.getBasket();
        Order newOrder = createOrder(user, basket.getBasketProducts(), orderCreateDto);
        Order savedOrder = orderRepository.save(newOrder);
        clearBasket(basket);

        return orderMapper.toDto(savedOrder);
    }

    private Order createOrder(User user,
                              List<Product> basketProducts,
                              OrderCreateDto orderCreateDto) {
        if (basketProducts.isEmpty()) {
            throw new ServiceException("Your basket is empty!");
        }
        Order newOrder = new Order();
        newOrder.setUser(user);
        newOrder.setDateOfPurchase(LocalDateTime.now());
        newOrder.setOrderProducts(resolveProducts(basketProducts));
        newOrder.setPrice(calculatePrice(newOrder.getOrderProducts()));
        newOrder.setDeliveryType(orderCreateDto.getDeliveryType());
        return newOrder;
    }

    private void clearBasket(Basket basket) {
        basket.setBasketProducts(null);
        basket.setTotalPrice(BigDecimal.ZERO);
        basketRepository.save(basket);
    }


    private List<Product> resolveProducts(List<Product> products) {
        return
                products.stream()
                        .map(basketProduct -> {
                            Product product = productRepository.findById(basketProduct.getId())
                                    .orElseThrow(() -> new ResourceNotFoundException("No product with id=" + basketProduct.getId()));
                            if (product.getCountAvailable() == 0) { //
                                throw new ServiceException("Product with name=" + product.getName() + " is unavailable now!");
                            } else {
                                product.setCountAvailable(product.getCountAvailable() - 1);
                            }
                            return product;
                        })
                        .collect(Collectors.toList());
    }

    private BigDecimal calculatePrice(List<Product> orderProducts) {
        return orderProducts
                .stream()
                .map(Product::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private User resolveUser(Long userId) {
        return
                userRepository.findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User with id=" + userId + " not found!"));
    }

    @Override
    public OrderDto findByIdAndUserId(Long orderId, Long userId) {
        return null;
    }


    @Override
    public PageWrapper<OrderDto> findAllByUserId(Paging paging, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No user with id=" + userId));

        Pageable pageable = PageRequest.of(paging.getPage(), paging.getSize());

        Page<Order> page = orderRepository.findAllByUser(pageable, user);

        return
                PageWrapper.of(
                        orderMapper.toDtoList(page.toList()),
                        page.getTotalPages(),
                        page.getTotalElements(),
                        paging.getPage(),
                        page.getNumberOfElements());
    }
}
