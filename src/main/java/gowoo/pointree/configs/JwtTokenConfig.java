package gowoo.pointree.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt.token")
@Getter @Setter
public class JwtTokenConfig {
    private String header;

    private String issuer;

    private String clientSecret;

    private int accessExpirySeconds;

    private int refreshExpirySeconds;
}
