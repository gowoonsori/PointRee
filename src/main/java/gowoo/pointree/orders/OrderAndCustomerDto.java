package gowoo.pointree.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderAndCustomerDto {
    private Long id;

    private int price;

    private int accumulationRate;

    private int savePoint;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private LocalDateTime createdTime;

    private Long customerId;

    private String phoneNumber;

    private int purchaseCnt;

    public static OrderAndCustomerDto of(Order order){return new OrderAndCustomerDto(order);}

    public OrderAndCustomerDto (Order order){
        this.id = order.getId();
         this.price = order.getPrice();
         this.accumulationRate = order.getAccumulationRate();
         this.savePoint = order.getSavePoint();
         this.paymentType = order.getPaymentType();
         this.createdTime = order.getCreatedTime();
         this.customerId = order.getCustomer().getId();
         this.phoneNumber = order.getCustomer().getPhoneNumber();
         this.purchaseCnt = order.getCustomer().getPurchaseCnt();
    }
}
