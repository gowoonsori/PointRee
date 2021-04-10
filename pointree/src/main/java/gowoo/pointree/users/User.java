package gowoo.pointree.users;


import com.fasterxml.jackson.annotation.JsonInclude;
import gowoo.pointree.customers.Customer;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode(of ="id")
@Entity
public class User{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String phoneNumber;

    private int accumulationRate;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Customer> customers = new ArrayList<>();

    /*중요정보를 제외한 데이터를 전달하기 위한 Dto*/
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Getter
    public static class Info{
        private final String email;

        private final String name;

        private final String phoneNumber;

        private final int accumulationRate;

        private final LocalDateTime createdTime;

        public static User.Info of(User user){
            return new User.Info(user);
        }

        public Info(User user) {
            this.email = user.email;
            this.name = user.name;
            this.phoneNumber = user.phoneNumber;
            this.accumulationRate = user.accumulationRate;
            this.createdTime = user.createdTime;
        }
    }
}
