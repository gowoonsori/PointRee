package gowoo.pointree.orders;

import com.fasterxml.jackson.annotation.JsonInclude;
import gowoo.pointree.customers.Customer;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "ORDERS")
@Getter @EqualsAndHashCode(of = "id")
@AllArgsConstructor @NoArgsConstructor
@Builder @DynamicUpdate
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int price;

    private int accumulationRate;

    private int savePoint;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @CreationTimestamp
    private LocalDateTime createdTime;


    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Info {
        private Long id;

        private int price;

        private int accumulationRate;

        private int savePoint;

        private PaymentType paymentType;

        @CreationTimestamp
        @Column(name = "created_time", updatable = false)
        private LocalDateTime createdTime;

        public static Order.Info createFromOrder(Order order) { return new Info(order);}

        public Info(Order order) {
            id = order.id;
            price = order.price;
            accumulationRate = order.accumulationRate;
            savePoint = order.savePoint;
            paymentType = order.paymentType;
            createdTime = order.createdTime;
        }
    }

    @Getter
    public static class Request {
        private int price;

        private int accumulationRate;

        private int savePoint;

        private PaymentType paymentType;

        public Request(int price,int accumulationRate,PaymentType paymentType){
            this.price = price;
            this.accumulationRate = accumulationRate;
            this.paymentType = paymentType;
            savePoint = price / 100 * accumulationRate;
        }
    }
}
