package gowoo.pointree.customers;


import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.errors.UnauthorizedException;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.users.User;
import gowoo.pointree.users.UserService;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    public ApiResult<Customer.Info> getCustomer(@PathVariable Long id){
        Customer customer = customerService.getCustomer(id).orElseThrow(()->new BadRequestException("해당 고객이 존재하지않습니다."));
        return success(Customer.Info.of(customer));
    }

    @GetMapping
    public ApiResult<List<Customer.Info>> getCustomers(@AuthenticationPrincipal JwtAuthentication authentication){
        List<Customer> customers = customerService.getCustomers(authentication.id);
        return success(customers.stream().map(Customer.Info::new).collect(Collectors.toList()));
    }

    @PostMapping
    public ApiResult<Customer.Info> insertCustomer(@Valid @RequestBody Customer.Info customerInfo,
                                                 @AuthenticationPrincipal JwtAuthentication authentication){
        Customer customer = modelMapper.map(customerInfo, Customer.class);
        User user = userService.findById(authentication.id).orElseThrow(()-> new UnauthorizedException("사용자 정보를 찾을 수 없습니다."));
        customer.setUser(user);
        return success(Customer.Info.of(customerService.insert(customer)));
    }
}
