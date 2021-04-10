package gowoo.pointree.customers;

import com.fasterxml.jackson.annotation.JsonInclude;
import gowoo.pointree.users.User;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity @Getter @Setter
@EqualsAndHashCode(of = "id")
public class Customer{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String phoneNumber;

    private int totalPoint;

    private int purchaseCnt;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdTime;

    /*중요정보를 제외한 데이터를 전달하기 위한 Dto*/
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Getter @AllArgsConstructor
    public static class Info{
        private Long id;
        @NotBlank
        @Pattern(regexp = "^(01\\d{1}|02|0505|0502|0506|0\\d{1,2})-?(\\d{3,4})-?(\\d{4})")
        private final String phoneNumber;

        private final int totalPoint;

        private final int purchaseCnt;

        private final LocalDateTime createdTime;

        public static Customer.Info of(Customer customer){
            return new Customer.Info(customer);
        }

        public Info(Customer customer) {
            this.id = customer.id;
            this.phoneNumber = customer.phoneNumber;
            this.totalPoint = customer.totalPoint;
            this.purchaseCnt = customer.purchaseCnt;
            this.createdTime = customer.createdTime;
        }
    }
}
