package by.bsuir.service.dto.mapper;

import by.bsuir.entity.Order;
import by.bsuir.service.dto.order.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper extends AbstractMapper<Order, OrderDto> {

    @Autowired
    public OrderMapper() {
        super(Order.class, OrderDto.class);
    }

}

