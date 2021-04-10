package gowoo.pointree.customers;


import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.security.JwtAuthenticationToken;
import gowoo.pointree.users.User;
import gowoo.pointree.users.UserService;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static gowoo.pointree.utils.ApiUtils.success;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    private final UserService userService;

    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ApiResult<Customer.Info> getCustomer(@PathVariable Long id, @AuthenticationPrincipal JwtAuthentication authentication){
        Customer customer = customerService.getCustomer(id).orElseThrow(()->new BadRequestException("해당 고객이 존재하지않습니다."));
        User user = customer.getUser();
        if(!user.getId().equals(authentication.id)) throw new BadRequestException("해당 고객이 존재하지않습니다."); //다른 user의 고객일때
        return success(Customer.Info.of(customer));
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
        Customer customer = Customer.builder()
                .phoneNumber(customerInfo.getPhoneNumber())
                .totalPoint(customerInfo.getTotalPoint())
                .purchaseCnt(customerInfo.getPurchaseCnt())
                .user(user)
                .build();
        return success(Customer.Info.of(customerService.insert(customer)));
    }
}
