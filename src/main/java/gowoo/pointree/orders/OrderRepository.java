package gowoo.pointree.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByCustomerId(Long customerId);

    @Transactional
    @Modifying
    @Query("delete from orders o where o.customer.id in :ids")
    void deleteAllByCustomerIdInQuery(@Param("ids") List<Long> ids);

    @Query("select o from " +
            "orders o join fetch o.customer " +
            "where o.customer.user.id = :userId " +
            "and o.createdTime >= :preDate " +
            "and o.createdTime <= :postDate")
    List<Order> findAllByDateAndUserId(@Param("userId")Long userId,
                                       @Param("preDate")LocalDateTime preDate,
                                       @Param("postDate")LocalDateTime postDate);
}
