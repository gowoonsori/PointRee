package gowoo.pointree.orders;

import gowoo.pointree.customers.Customer;
import gowoo.pointree.customers.CustomerService;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static gowoo.pointree.utils.ApiUtils.success;


@RestController
@RequestMapping(value = "/api/customers/{customerId}/orders", produces = "application/json; charset=UTF-8")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final CustomerService customerService;

    @GetMapping(value = "/{orderId}")
    public ApiResult<Order.Info> getOrder(@PathVariable Long orderId, @AuthenticationPrincipal JwtAuthentication authentication){
        return success(Order.Info.createFromOrder(orderService.getOrder(orderId,authentication.id)));
    }

    @GetMapping
    public ApiResult<List<Order.Info>> getOrders(@PathVariable Long customerId, @AuthenticationPrincipal JwtAuthentication authentication){
        Customer customer = customerService.getCustomer(customerId, authentication.id);
        List<Order> orders = orderService.getOrders(customer);
        return success(orders.stream().map(Order.Info::new).collect(Collectors.toList()));
    }

    @PostMapping
    public ApiResult<Order.Info> insertOrder(@Valid @RequestBody Order.Request orderRequest,
                                             @PathVariable Long customerId, @AuthenticationPrincipal JwtAuthentication authentication){
        Customer customer = customerService.getCustomer(customerId, authentication.id);
        return success(Order.Info.createFromOrder(orderService.insert(customer, orderRequest)));
    }
}
