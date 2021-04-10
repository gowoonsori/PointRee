package gowoo.pointree.customers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer insert(Customer customer){
        return customerRepository.save(customer);
    }

    public Optional<Customer> getCustomer(Long id){
        return customerRepository.findById(id);
    }

    public List<Customer> getCustomers(Long userId){
        return customerRepository.findByUserId(userId);
    }

    public Page<Customer> getCustomers(Long userId,Pageable pageable){
        return customerRepository.findAllByUserId(userId, pageable);
    }
}
