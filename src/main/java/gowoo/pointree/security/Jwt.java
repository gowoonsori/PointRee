package gowoo.pointree.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import gowoo.pointree.configs.JwtTokenConfig;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
@Component
public class Jwt {
    private final Algorithm algorithm;

    private final JWTVerifier jwtVerifier;

    private final JwtTokenConfig jwtTokenConfig;

    public Jwt(JwtTokenConfig jwtTokenConfig) {
        this.jwtTokenConfig = jwtTokenConfig;
        this.algorithm = Algorithm.HMAC512(jwtTokenConfig.getClientSecret());
        this.jwtVerifier = JWT.require(algorithm)
                .withIssuer(jwtTokenConfig.getIssuer())
                .build();
    }

    public String create(Claims claims) {
        Date now = new Date();
        return JWT.create()
                .withIssuer(jwtTokenConfig.getIssuer())
                .withIssuedAt(now)
                .withClaim("userKey", claims.userKey)
                .withClaim("name", claims.name)
                .withArrayClaim("roles", claims.roles)
                .withExpiresAt(new Date(now.getTime() + jwtTokenConfig.getAccessExpirySeconds() * 1000L))
                .sign(algorithm);
    }

    public Claims verify(String token) throws JWTVerificationException {
        return new Claims(jwtVerifier.verify(token));
    }

    static public class Claims {
        Long userKey;
        String name;
        String[] roles;
        Date iat;
        Date exp;

        public Claims(Long userKey, String name, String[] roles) {
            this.userKey = userKey;
            this.name = name;
            this.roles = roles;
        }

        Claims(DecodedJWT decodedJWT) {
            Claim userKey = decodedJWT.getClaim("userKey");
            if (!userKey.isNull()) {
                this.userKey = userKey.asLong();
            }
            Claim name = decodedJWT.getClaim("name");
            if (!name.isNull()) {
                this.name = name.asString();
            }
            Claim roles = decodedJWT.getClaim("roles");
            if (!roles.isNull()) {
                this.roles = roles.asArray(String.class);
            }
            this.iat = decodedJWT.getIssuedAt();
            this.exp = decodedJWT.getExpiresAt();
        }
    }
}
