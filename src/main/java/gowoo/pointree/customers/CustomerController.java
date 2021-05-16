package gowoo.pointree.customers;


import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.security.JwtAuthenticationToken;
import gowoo.pointree.users.User;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static gowoo.pointree.utils.ApiUtils.success;

//공부한점 : Parameter로맵핑되는 객체에는 Allargument 생성자가 필요하다.

@RestController
@RequestMapping(value = "/api/customers", produces = "application/json; charset=UTF-8")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/{customerId}")
    public ApiResult<Customer.Info> getCustomer(@PathVariable Long customerId, @AuthenticationPrincipal JwtAuthentication authentication){
        return success(Customer.Info.of(customerService.getCustomer(customerId, authentication.id)));
    }

    @GetMapping("/phoneNumber/{phoneNumber}")
    public ApiResult<Customer.Info> getCustomerToPhoneNumber(@PathVariable String phoneNumber, JwtAuthenticationToken authentication){
        User user = (User)authentication.getDetails();
        Optional<Customer> customer = customerService.getCustomerToPhoneNumber(phoneNumber, user.getId());
        if(customer.isPresent()) return success(Customer.Info.of(customer.get()));

        Customer newCustomer = customerService.insert(
                Customer.builder()
                    .purchaseCnt(0)
                    .phoneNumber(phoneNumber)
                    .totalPoint(0)
                    .user(user)
                    .build());
        return success(Customer.Info.of(newCustomer));
    }

    @GetMapping
    public ApiResult<Page<Customer.Info>> queryCustomers(Pageable pageable, @AuthenticationPrincipal JwtAuthentication authentication){
        Page<Customer> page = customerService.getCustomers(authentication.id, pageable);
        return success(page.map(Customer.Info::new));
    }

    @GetMapping("/all")
    public ApiResult<List<Customer.Info>> getCustomers(@AuthenticationPrincipal JwtAuthentication authentication){
        List<Customer> customers = customerService.getCustomers(authentication.id);
        return success(customers.stream().map(Customer.Info::new).collect(Collectors.toList()));
    }

    @PostMapping
    public ApiResult<Customer.Info> insertCustomer(@Valid @RequestBody Customer.Info customerInfo,
                                                JwtAuthenticationToken authentication){
        User user = (User)authentication.getDetails();
        Optional<Customer> customer = customerService.getCustomerToPhoneNumber(customerInfo.getPhoneNumber(), user.getId());
        if(customer.isPresent()) throw new BadRequestException("이미 존재하는 고객입니다.");
        Customer newCustomer = Customer.builder()
                .purchaseCnt(customerInfo.getPurchaseCnt())
                .phoneNumber(customerInfo.getPhoneNumber())
                .totalPoint(customerInfo.getTotalPoint())
                .user(user)
                .build();

        return success(Customer.Info.of(customerService.insert(newCustomer)));
    }
}
