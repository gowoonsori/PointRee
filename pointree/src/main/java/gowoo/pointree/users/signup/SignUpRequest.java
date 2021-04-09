package gowoo.pointree.users.signup;


import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

/*
* 회원가입시 필드 입력값 검증 DTO
* */

@Getter @Builder
public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 50)
    @Pattern(regexp = "[\\w~\\-.+]+@[\\w~\\-]+(\\.[\\w~\\-]+)+")
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 11, max = 14)
    @Pattern(regexp = "^(01\\d{1}|02|0505|0502|0506|0\\d{1,2})-?(\\d{3,4})-?(\\d{4})")
    private String phoneNumber;

    @Min(0) @Max(100)
    private int accumulationRate;

    private LocalDateTime createdTime;

    public SignUpRequest(String email, String password, String name, String phoneNumber, int accumulationRate, LocalDateTime createdTime) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.accumulationRate = accumulationRate == 0 ? 5 : accumulationRate;
        this.createdTime = createdTime;
    }
}
