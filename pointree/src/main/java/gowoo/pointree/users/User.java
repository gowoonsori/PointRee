package gowoo.pointree.users;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode(of ="id")
@Entity @Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String phoneNumber;

    private int accumulationRate;

    @CreationTimestamp
    @Column(insertable = false)
    private LocalDateTime createdTime;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Getter @Setter @NoArgsConstructor
    @AllArgsConstructor @Builder
    public static class Info{
        private String email;

        private String name;

        private String phoneNumber;

        private int accumulationRate;

        public static User.Info of(User user){
            return new User.Info(user.email, user.name, user.phoneNumber, user.accumulationRate);
        }

        public Info(User user) {
            this.email = user.email;
            this.name = user.name;
            this.phoneNumber = user.phoneNumber;
            this.accumulationRate = user.accumulationRate;
        }
    }
}
