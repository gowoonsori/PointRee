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
        //context에 있는 인증객체를 Manager로부터 받아 JwtAuthentication으로 변환
        JwtAuthentication principal = (JwtAuthentication) authentication.getPrincipal();
        //db에 존재하는 user인지 확인 => 없다면 BadCredentialsException 예외 발생
        User user = userService.getUser(principal.id);

        //인증 주체와 role 포함한 인증객체 생성해서 인증여부 true로 반환
        JwtAuthenticationToken authenticated = new JwtAuthenticationToken( new JwtAuthentication(user.getId(), user.getName()), null,
                AuthorityUtils.createAuthorityList(user.getRole().name()));
        authenticated.setDetails(user);
        return authenticated;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
