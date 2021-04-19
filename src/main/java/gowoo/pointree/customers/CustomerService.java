package gowoo.pointree.customers;

import gowoo.pointree.errors.BadRequestException;
import gowoo.pointree.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Transactional
    public Customer insert(Customer request){
        return customerRepository.save(request);
    }

    public Customer getCustomer(Long customerId,Long userId){
        Customer customer = customerRepository.findById(customerId).orElseThrow(()->new BadRequestException("해당 고객이 존재하지않습니다."));
        User user = customer.getUser();
        if(!user.getId().equals(userId)) throw new BadRequestException("해당 고객이 존재하지않습니다."); //다른 user의 고객일때
        return customer;
    }

    public List<Customer> getCustomers(Long userId){
        return customerRepository.findByUserId(userId);
    }

    public Page<Customer> getCustomers(Long userId,Pageable pageable){
        return customerRepository.findAllByUserId(userId, pageable);
    }
}
