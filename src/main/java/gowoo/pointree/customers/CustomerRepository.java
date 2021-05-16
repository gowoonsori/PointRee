package gowoo.pointree.customers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByUserId(Long userId);
    Optional<Customer> findByPhoneNumberAndUserId(String phoneNumber, Long userId);
    Page<Customer> findAllByUserId(Long userId, Pageable pageable);
}
