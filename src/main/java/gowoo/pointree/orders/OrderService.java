package gowoo.pointree.orders;

import gowoo.pointree.customers.Customer;
import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.errors.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;

    public Order getOrder(Long orderId,Long userId){
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new BadRequestException("요청하신 구매내역은 존재하지 않습니다."));
        if(!order.getCustomer().getUser().getId().equals(userId)) throw new BadRequestException("요청하신 구매내역은 존재하지 않습니다.");
        return order;
    }

    public  List<Order> getOrders(Customer customer){
        return customer.getOrders();
    }

    public List<Order> getOrdersByDate(List<LocalDateTime>date, Long userId){
        List<Order> orders = orderRepository.findAllByDateAndUserId(userId, date.get(0), date.get(1));
        return orders;
    }

    @Transactional
    public Order insert(Customer customer, Order request){
        customer.addTotalPoint(request.getSavePoint());
        return orderRepository.save(request);
    }

    @Transactional
    public Order update(Customer customer,Order request){
        Order order = orderRepository.findById(request.getId()).orElseThrow(()->new NotFoundException("구매내역을 찾을 수 없습니다."));
        customer.updateTotalPoint(request.getSavePoint() - order.getSavePoint());
        return orderRepository.save(request);
    }

    @Transactional
    public void delete(Customer customer,Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(()->new NotFoundException("구매내역을 찾을 수 없습니다."));
        customer.deleteTotalPoint(order.getSavePoint());
        orderRepository.delete(order);
    }

}
