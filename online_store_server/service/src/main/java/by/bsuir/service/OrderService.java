package by.bsuir.service;

import by.bsuir.service.dto.order.OrderCreateDto;
import by.bsuir.service.dto.order.OrderDto;
import by.bsuir.service.dto.PageWrapper;
import by.bsuir.service.dto.Paging;

public interface OrderService {

    OrderDto save(OrderCreateDto orderCreateDto);

    OrderDto findByIdAndUserId(Long orderId, Long userId);

    PageWrapper<OrderDto> findAllByUserId(Paging paging, Long userId);
}
