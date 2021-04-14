package gowoo.pointree.users.login;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/*
* 로그인시 입력값 검증 DTO
* */

@Getter
public class LoginRequest {
    @NotBlank
    @Size(min = 4, max = 50)
    @Pattern(regexp = "[\\w~\\-.+]+@[\\w~\\-]+(\\.[\\w~\\-]+)+")
    private String email;

    @NotBlank
    @Size(min = 4, max = 16)
    private String password;
}
