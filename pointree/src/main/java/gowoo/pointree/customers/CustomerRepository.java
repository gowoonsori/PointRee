package gowoo.pointree.customers;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer save(Customer customer);

    List<Customer> findByUserId(Long userId);
}
