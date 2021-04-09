package gowoo.pointree.users.login;

import gowoo.pointree.users.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginResult {
    private final String token;

    private final User.Info user;
}
