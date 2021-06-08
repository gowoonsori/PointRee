package gowoo.pointree.security;

import lombok.AllArgsConstructor;

/*
* JwtAuthenticationToken의 principal 객체
*
*   @Param
*    - id : user id
*    - name : email
* */

@AllArgsConstructor
public class JwtAuthentication {
    public final Long id;

    public final String name;
}
