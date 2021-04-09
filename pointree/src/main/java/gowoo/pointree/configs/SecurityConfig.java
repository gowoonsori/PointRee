package gowoo.pointree.configs;

import gowoo.pointree.security.EntryPointUnauthorizedHandler;
import gowoo.pointree.security.Jwt;
import gowoo.pointree.security.JwtAccessDeniedHandler;
import gowoo.pointree.security.JwtAuthenticationTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtAccessDeniedHandler accessDeniedHandler;

    private final EntryPointUnauthorizedHandler unauthorizedHandler;

    private final Jwt jwt;

    private final JwtTokenConfig jwtTokenConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(new JwtAuthenticationTokenFilter(jwtTokenConfig.getHeader(), jwt),
                        UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                // All endpoints require authentication
                .antMatchers("/api/users/login").permitAll()
                .antMatchers("/api/users/signup").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(unauthorizedHandler)
                .and()
                // Disable the session management filter
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Disable CSRF Token generation
                .csrf().disable()
                // Disable the default HTTP Basic-Auth
                .httpBasic().disable()
                // Disable the /logout filter
                .logout().disable()
                .headers().disable();
    }
}
