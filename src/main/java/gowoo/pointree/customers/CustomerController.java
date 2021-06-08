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

    /*단일 고객 정보를 조회하는 기본 메서드로 id를 이용해 접근*/
    @GetMapping("/{customerId}")
    public ApiResult<Customer.Info> getCustomer(@PathVariable Long customerId, @AuthenticationPrincipal JwtAuthentication authentication){
        return success(Customer.Info.of(customerService.getCustomer(customerId, authentication.id)));
    }

    /*단일 고객 정보를 조회하는 메서드중 하나로 id를 모를때 전화번호로 접근*/
    @GetMapping("/phoneNumber/{phoneNumber}")
    public ApiResult<Customer.Info> getCustomerAtPhoneNumber(@PathVariable String phoneNumber, JwtAuthenticationToken authentication){
        User user = (User)authentication.getDetails();
        Optional<Customer> customer = customerService.getCustomerAtPhoneNumber(phoneNumber, user.getId());
        if(customer.isPresent()) return success(Customer.Info.of(customer.get()));

        Customer newCustomer = Customer.builder()
                .purchaseCnt(0)
                .phoneNumber(phoneNumber)
                .totalPoint(0)
                .user(user)
                .build();
        newCustomer = customerService.insert(newCustomer);
        return success(Customer.Info.of(newCustomer));
    }

    /*고객 정보 paging 조회 */
    @GetMapping
    public ApiResult<Page<Customer.Info>> queryCustomers(Pageable pageable, @AuthenticationPrincipal JwtAuthentication authentication){
        Page<Customer> page = customerService.getCustomers(authentication.id, pageable);
        return success(page.map(Customer.Info::new));
    }

    /*모든 고객정보 조회*/
    @GetMapping("/all")
    public ApiResult<List<Customer.Info>> getCustomers(@AuthenticationPrincipal JwtAuthentication authentication){
        List<Customer> customers = customerService.getCustomers(authentication.id);
        return success(customers.stream().map(Customer.Info::new).collect(Collectors.toList()));
    }

    @PostMapping
    public ApiResult<Customer.Info> insertCustomer(@Valid @RequestBody Customer.Info customerInfo,
                                                JwtAuthenticationToken authentication){
        User user = (User)authentication.getDetails();
        Optional<Customer> customer = customerService.getCustomerAtPhoneNumber(customerInfo.getPhoneNumber(), user.getId());
        if(customer.isPresent()) throw new BadRequestException("이미 존재하는 고객입니다.");
        Customer newCustomer = Customer.builder()
                .purchaseCnt(customerInfo.getPurchaseCnt())
                .phoneNumber(customerInfo.getPhoneNumber())
                .totalPoint(customerInfo.getTotalPoint())
                .user(user)
                .build();

        return success(Customer.Info.of(customerService.insert(newCustomer)));
    }

    @DeleteMapping
    public ApiResult<String> deleteCustomer(@RequestBody List<Long> customerIds){
        customerService.delete(customerIds);
        return success("정상적으로 삭제되었습니다.");
    }
}
