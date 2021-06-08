package gowoo.pointree.users;


import com.fasterxml.jackson.annotation.JsonInclude;
import gowoo.pointree.customers.Customer;
import gowoo.pointree.security.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode(of ="id")
@Entity @DynamicUpdate
public class User{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String phoneNumber;

    private Integer accumulationRate;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdTime;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Customer> customers = new ArrayList<>();

    public void updateInfo(User info){
        if(info.getEmail() != null) this.email = info.getEmail();
        if(info.getName() != null ) this.name =info.getName();
        if(info.getPassword() != null) this.password =  info.getPassword();
        if(info.getAccumulationRate() != null) this.accumulationRate = info.getAccumulationRate();
        if(info.getPhoneNumber() != null)this.phoneNumber =info.getPhoneNumber();
    }

    /*중요정보를 제외한 데이터를 전달하기 위한 Dto*/
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Getter
    public static class Info{
        private final String email;

        private final String name;

        private final String phoneNumber;

        private final int accumulationRate;

        private Role role;

        private final LocalDateTime createdTime;

        public static User.Info createFromUser(User user){
            return new User.Info(user);
        }

        public Info(User user) {
            this.email = user.email;
            this.name = user.name;
            this.phoneNumber = user.phoneNumber;
            this.role = user.role;
            this.accumulationRate = user.accumulationRate;
            this.createdTime = user.createdTime;
        }
    }
}
