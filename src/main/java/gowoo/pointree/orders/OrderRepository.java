package gowoo.pointree.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByCustomerId(Long customerId);

    @Transactional
    @Modifying
    @Query("delete from ORDERS c where c.customer.id in :ids")
    void deleteAllByCustomerIdInQuery(@Param("ids") List<Long> ids);
}
