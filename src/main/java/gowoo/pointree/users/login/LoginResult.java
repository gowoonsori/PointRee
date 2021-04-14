package gowoo.pointree.users.login;

import gowoo.pointree.users.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResult {
    private String token;

    private User.Info user;
}
