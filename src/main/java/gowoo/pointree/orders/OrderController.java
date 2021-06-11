package gowoo.pointree.orders;

import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static gowoo.pointree.utils.ApiUtils.success;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/date")
    public ApiResult<List<OrderAndCustomerDto>> getOrdersByDate(
            @RequestParam(value="preDate") String preDate,
            @RequestParam(value="postDate") String postDate,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication){

        List<LocalDateTime> list = new ArrayList<>();
        list.add(LocalDateTime.parse(preDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        list.add(LocalDateTime.parse(postDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        List<Order> orders= orderService.getOrdersByDate(list,  jwtAuthentication.id);

        return success(orders.stream().map(OrderAndCustomerDto::of).collect(Collectors.toList()));
    }
}
