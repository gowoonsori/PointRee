package gowoo.pointree.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationTokenFilter implements Filter {

    private static final Pattern BEARER = Pattern.compile("^Bearer$", Pattern.CASE_INSENSITIVE);

    private final String headerName;

    private final Jwt jwt;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException{
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            String authorizationToken = getTokenFromHeader(request);
            if (authorizationToken != null) {
                try {
                    Jwt.Claims claims = getClaims(authorizationToken);
                    Long userKey = claims.userKey;
                    String name = claims.name;
                    List<GrantedAuthority> authorities = getAuthorities(claims);

                    if (nonNull(userKey) && isNotEmpty(name) && authorities.size() > 0) {
                        JwtAuthenticationToken authentication =
                                new JwtAuthenticationToken(new JwtAuthentication(userKey, name), null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }catch (Exception e){
                    log.info("유효하지 않은 JWT토큰");
                }
            }
            chain.doFilter(request, response);
        }
    }

    private String getTokenFromHeader(HttpServletRequest request) {
        String token = request.getHeader(headerName);
        if (token != null) {
            String[] parts = token.split(" ");
            if (parts.length == 2) {
                String scheme = parts[0];
                String credentials = parts[1];
                return BEARER.matcher(scheme).matches() ? credentials : null;
            }
        }
        return null;
    }

    private List<GrantedAuthority> getAuthorities(Jwt.Claims claims) {
        String[] roles = claims.roles;
        return roles == null || roles.length == 0 ?
                Collections.emptyList() :
                Arrays.stream(roles).map(SimpleGrantedAuthority::new).collect(toList());
    }

    private Jwt.Claims getClaims(String token) {
        return jwt.verify(token);
    }
}
