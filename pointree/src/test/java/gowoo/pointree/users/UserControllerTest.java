package gowoo.pointree.users;


import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest extends BaseTest {
    @Test
    @DisplayName("로그인 성공 테스트 (아이디, 비밀번호가 올바른 경우)")
    @Order(1)
    void 로그인성공테스트() throws Exception {
        //given
        String email = "test@gmail.com";
        String passwd = "1234";

        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\""
                                + email
                                +"\",\"password\":\""
                                +passwd
                                +"\"}")
        );
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(UserController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.token").exists())
                .andExpect(jsonPath("$.response.token").isString())
                .andExpect(jsonPath("$.response.user.name", is("tester")))
                .andExpect(jsonPath("$.response.user.email").value(email))
                .andExpect(jsonPath("$.response.user.name").exists())
                .andExpect(jsonPath("$.response.user.phoneNumber").exists())
                .andExpect(jsonPath("$.response.user.accumulationRate").exists())
        ;
    }

    @Test
    @Order(2)
    @DisplayName("로그인 실패 테스트 (비밀번호가 올바르지 않은 경우)")
    void 로그인실패테스트_비밀번호오류() throws Exception {
        //given
        String email = "test@gmail.com";
        String passwd = "4321";

        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\""
                                + email
                                +"\",\"password\":\""
                                +passwd
                                +"\"}")
        );

        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(handler().handlerType(UserController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(401)));
    }

    @Test
    @Order(3)
    @DisplayName("로그인 실패 테스트 (없는 이메일일 경우)")
    void 로그인실패테스트_없는이메일() throws Exception {
        //given
        String email = "test12@gmail.com";
        String passwd = "4321";

        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\""
                                + email
                                +"\",\"password\":\""
                                +passwd
                                +"\"}")
        );

        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(handler().handlerType(UserController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(401)))
        ;
    }

    @Test
    @Order(4)
    @DisplayName("내 정보 조회 성공 테스트 (토큰이 올바른 경우)")
    void 내정보조회성공테스트() throws Exception {
        //given & when
        ResultActions result = mockMvc.perform(
                get("/api/users/me")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(UserController.class))
                .andExpect(handler().methodName("getMyInfo"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.name", is("tester")))
                .andExpect(jsonPath("$.response.email").exists())
                .andExpect(jsonPath("$.response.name").exists())
                .andExpect(jsonPath("$.response.phoneNumber").exists())
                .andExpect(jsonPath("$.response.accumulationRate").exists());
    }

    @Test
    @Order(5)
    @DisplayName("내 정보 조회 실패 테스트 (토큰이 올바르지 않을 경우)")
    void 내정보조회실패테스트() throws Exception {
        //given & when
        ResultActions result = mockMvc.perform(
                get("/api/users/me")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), "Bearer " + randomAlphanumeric(60))
        );

        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(401)))
                .andExpect(jsonPath("$.error.message", is("Unauthorized")));
    }

    @Test
    @Order(6)
    @DisplayName("내 정보 수정 (일단은 email-passwd모두 한페이지에서 수정/추후에 별도로 분리")
    void 내정보수정성공테스트() throws Exception{
        //Given
        String name = "raon";
        int accmulationRate = 10;

        UpdateInfoRequest user = UpdateInfoRequest.builder()
                .name(name)
                .accumulationRate(accmulationRate)
                .build();
        String str = objectMapper.writeValueAsString(user);
        //when
        ResultActions result = mockMvc.perform(
                patch("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken())
                        .content(str));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.response.name").value(name))
                .andExpect(jsonPath("$.response.accumulationRate").value(accmulationRate));
    }
}