package gowoo.pointree.orders;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import gowoo.pointree.customers.Customer;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDateTime;

@Entity(name = "ORDERS")
@Getter @EqualsAndHashCode(of = "id")
@NoArgsConstructor @DynamicUpdate
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
    @JsonBackReference
    private Customer customer;

    @CreationTimestamp
    @Column(name = "created_time", updatable = false)
    private LocalDateTime createdTime;

    @Builder
    public Order(Long id, int price, int accumulationRate, PaymentType paymentType, Customer customer, LocalDateTime createdTime) {
        this.id = id;
        this.price = price;
        this.accumulationRate = accumulationRate;
        this.paymentType = paymentType;
        this.customer = customer;
        this.createdTime = createdTime;
        this.savePoint = this.price / 100 * accumulationRate;
    }

    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Info {
        private Long id;

        private int price;

        private int accumulationRate;

        private int savePoint;

        private PaymentType paymentType;

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

        @Min(0) @Max(100)
        private int accumulationRate;

        private PaymentType paymentType;

        public Request(int price,int accumulationRate,PaymentType paymentType){
            this.price = price;
            this.accumulationRate = accumulationRate;
            this.paymentType = paymentType;
        }
    }
}
