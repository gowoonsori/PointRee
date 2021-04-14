package gowoo.pointree.security;

import gowoo.pointree.users.User;
import gowoo.pointree.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {
    private final UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        JwtAuthentication principal = (JwtAuthentication) authentication.getPrincipal();
        User user = userService.getUser(principal.id);
        JwtAuthenticationToken authenticated = new JwtAuthenticationToken( new JwtAuthentication(user.getId(), user.getName()), null,
                AuthorityUtils.createAuthorityList(Role.USER.name()));
        authenticated.setDetails(user);
        return authenticated;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
