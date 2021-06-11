package gowoo.pointree.orders;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
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

    @Test
    @DisplayName("날짜로 orders조회 쿼리 테스트")
    void findAllByDateAndUserIdTest() throws Exception{
        //given
        Long userId = 1L;
        LocalDateTime preDate = LocalDateTime.parse("2021-04-12 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDateTime postDate = LocalDateTime.parse("2021-04-13 23:59:59", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        List<LocalDateTime> list = Arrays.asList(preDate,postDate);


        List<Order> result = orderRepository.findAllByDateAndUserId(userId, list.get(0), list.get(1));
        System.out.println(result);
    }
}
