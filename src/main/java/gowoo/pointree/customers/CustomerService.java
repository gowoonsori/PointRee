package gowoo.pointree.customers;

import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.orders.OrderRepository;
import gowoo.pointree.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Customer insert(Customer customer){
        return customerRepository.save(customer);
    }

    /*고객 한명 조회하는 기본 메서드
     *   customerId : 조회할 고객 id
     *   userId : 조회할 고객이 User의 고객인지 확인을 위한 userId
    * */
    public Customer getCustomer(Long customerId,Long userId){
        Customer customer = customerRepository.findById(customerId).orElseThrow(()->new BadRequestException("해당 고객이 존재하지않습니다."));
        User user = customer.getUser();
        if(!user.getId().equals(userId)) throw new BadRequestException("해당 고객이 존재하지않습니다."); //다른 user의 고객일때
        return customer;
    }

    /*고객 한명 전화번호로 조회 메서드
    *   phoneNumber : 조회할 전화번호
    *   userId : 조회할 고객이 User의 고객인지 확인을 위한 userId
    * */
    public Optional<Customer> getCustomerAtPhoneNumber(String phoneNumber,Long userId){
        return customerRepository.findByPhoneNumberAndUserId(phoneNumber,userId);
    }

    /* 모든 고객 조회
    *   userId : 조회하고 싶은 특정 사용자의 id
    * */
    public List<Customer> getCustomers(Long userId){
        return customerRepository.findByUserId(userId);
    }

    /* 고객정보를 paging처리해서 조회
    *       userId : 조회하고 싶은 userId
    *       pageable : paging방법에 대한 Pageable객체 (page,size,sort)
    * */
    public Page<Customer> getCustomers(Long userId,Pageable pageable){
        return customerRepository.findAllByUserId(userId, pageable);
    }

    /* 고객 정보 삭제 메서드
        단일 삭제가 아닌 JPQL을 이용해 Where in절로 대량 삭제
    *       customerIds : 삭제하고 싶은 고객id가 들어있는 id들
    * */
    @Transactional
    public void delete(List<Long> customerIds){
        orderRepository.deleteAllByCustomerIdInQuery(customerIds);
        customerRepository.deleteAllByIdInQuery(customerIds);
    }
}
