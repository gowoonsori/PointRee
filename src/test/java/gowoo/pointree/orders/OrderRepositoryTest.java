package gowoo.pointree.orders;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OrderRepositoryTest extends BaseTest {
    @Autowired
    private OrderRepository orderRepository;

    @Test
    @DisplayName("customerId로 deleteBatch실행테스트")
    void deleteAllByCustomerIdInQueryTest() throws Exception{
        //given
        List<Long> customerIds = new ArrayList<>();
        customerIds.add(1L); customerIds.add(2L);

        //when
        orderRepository.deleteAllByCustomerIdInQuery(customerIds);

        //then
        Optional<Order> order = orderRepository.findById(1L);
        Assertions.assertEquals(true,order.isEmpty() );
    }
}
