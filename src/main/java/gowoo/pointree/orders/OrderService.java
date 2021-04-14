package gowoo.pointree.orders;

import gowoo.pointree.customers.Customer;
import gowoo.pointree.customers.CustomerService;
import gowoo.pointree.errors.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final CustomerService customerService;

    public Order getOrder(Long orderId,Long userId){
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new BadRequestException("요청하신 구매내역은 존재하지 않습니다."));
        if(!order.getCustomer().getUser().getId().equals(userId)) throw new BadRequestException("요청하신 구매내역은 존재하지 않습니다.");
        return order;
    }

    public  List<Order> getOrders(Customer customer){
        List<Order> orders = customer.getOrders();
        return orders;
    }

    public Order insert(Customer customer, Order.Request request){
        Order order = Order.builder()
                .price(request.getPrice())
                .accumulationRate(request.getAccumulationRate())
                .savePoint(request.getSavePoint())
                .paymentType(request.getPaymentType())
                .customer(customer)
                .build();
        return orderRepository.save(order);
    }
}
