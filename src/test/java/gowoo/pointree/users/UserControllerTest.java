package gowoo.pointree.users;


import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
public class UserControllerTest extends BaseTest {
    @Test
    @DisplayName("로그인 성공 테스트 (아이디, 비밀번호가 올바른 경우)")
    @Order(1)
    void loginSuccessTest() throws Exception {
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
    @DisplayName("로그인 실패 테스트 (비밀번호가 올바르지 않은 경우)")
    void loginFailTest1() throws Exception {
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
    @DisplayName("로그인 실패 테스트 (없는 이메일일 경우)")
    void loginFailTest2() throws Exception {
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
    @DisplayName("내 정보 조회 성공 테스트 (토큰이 올바른 경우)")
    void getInfoSuccessTest() throws Exception {
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
    @DisplayName("내 정보 조회 실패 테스트 (토큰이 올바르지 않을 경우)")
    void getInfoFailTest() throws Exception {
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
    @DisplayName("내 정보 수정 성공 (일단은 email-passwd모두 한페이지에서 수정/추후에 별도로 분리")
    void updateSuccessTest() throws Exception{
        //Given
        String name = "raon";
        int accmulationRate = 10;
        String token = genreatedToken();

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
                        .header(jwtTokenConfig.getHeader(),token)
                        .content(str));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.response.name").value(name))
                .andExpect(jsonPath("$.response.accumulationRate").value(accmulationRate));
        ResultActions result2 = mockMvc.perform(
                get("/api/users/me")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),token))
                .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(handler().handlerType(UserController.class))
                    .andExpect(handler().methodName("getMyInfo"))
                    .andExpect(jsonPath("$.success", is(true)))
                    .andExpect(jsonPath("$.response.name", is("raon")))
                    .andExpect(jsonPath("$.response.email").exists())
                    .andExpect(jsonPath("$.response.name").exists())
                    .andExpect(jsonPath("$.response.phoneNumber").exists())
                    .andExpect(jsonPath("$.response.accumulationRate").exists());
    }

    @Test
    @DisplayName("내 정보 수정 실패(적립율 잘못 입력)")
    void updateFaileTest1() throws Exception{
        //Given
        String name = "raon";
        int accmulationRate = 1000;
        String request = "{\"email\":null,\"password\":null,\"name\":\""
                +name+"\",\"phoneNumber\":null,\"accumulationRate\":" +
                accmulationRate +"}";
        //when
        ResultActions result = mockMvc.perform(
                patch("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(400)))
                .andExpect(jsonPath("$.error.message", is("problem: 0~100까지만 입력 가능합니다.")));
    }

    @Test
    @DisplayName("내 정보 수정 실패(이메일 잘못 입력)")
    void updateFaileTest2() throws Exception{
        String email = "test@gamildd";
        String request = "{\"email\":\"" +
                email+"\",\"password\":null,\"name\":null,\"phoneNumber\":null,\"accumulationRate\":null}";
        //when
        ResultActions result = mockMvc.perform(
                patch("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(400)))
                .andExpect(jsonPath("$.error.message", is("problem: 유효하지 않은 email 형식입니다.")));
    }

    @Test
    @DisplayName("내 정보 수정 실패(전화번호 잘못 입력)")
    void updateFaileTest3() throws Exception {
        String phoneNumber = "0-312-3123";
        String request = "{\"email\":null,\"password\":null,\"name\":null,\"phoneNumber\":\"" +
                phoneNumber+"\",\"accumulationRate\":null}";
        //when
        ResultActions result = mockMvc.perform(
                patch("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("problem: 유효하지 않은 전화번호 형식입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("내 정보 수정 실패(비밀번호 잘못 입력)")
    void updateFaileTest4() throws Exception {
        String password = "qe111111111111111";
        String request = "{\"email\":null,\"password\":\"" +
                password+"\",\"name\":null,\"phoneNumber\":null,\"accumulationRate\":null}";
        //when
        ResultActions result = mockMvc.perform(
                patch("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("problem: 유효하지 않은 password 형식입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("회원 탈퇴 성공 테스트")
    void deleteUserSuccessTest() throws Exception{
        //when
        ResultActions result = mockMvc.perform(
                delete("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response",is(true)));
    }

    @Test
    @DisplayName("회원 탈퇴 실패 테스트(잘못된 토큰)")
    void deleteUserFailTest() throws Exception{
        //when
        ResultActions result = mockMvc.perform(
                delete("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken() + 1));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(401)));
    }
}