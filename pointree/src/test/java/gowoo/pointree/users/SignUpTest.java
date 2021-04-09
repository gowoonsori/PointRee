package gowoo.pointree.users;

import gowoo.pointree.commons.BaseTest;
import gowoo.pointree.users.signup.SignUpRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SignUpTest extends BaseTest {

    @Test
    @DisplayName("회원가입 성공 테스트")
    void signUpSuccess() throws Exception {
        //Given
        String email = "theraon@naver.com";
        String name = "raon";
        String phoneNumber = "010-1234-1111";

        SignUpRequest signUpRequest = SignUpRequest.builder()
                .name(name)
                .email(email)
                .password("1234")
                .phoneNumber(phoneNumber)
                .build();
        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signUpRequest)));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.response.email").value(email))
                .andExpect(jsonPath("$.response.name").value(name))
                .andExpect(jsonPath("$.response.phoneNumber").value(phoneNumber))
                .andExpect(jsonPath("$.response.accumulationRate").value(5))
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("회원가입 실패 테스트(email 존재)")
    void 회원가입실패_이메일존재() throws Exception {
        String email = "test@gmail.com";
        String name = "test";
        String phoneNumber = "010-1111-1111";

        SignUpRequest signUpRequest = SignUpRequest.builder()
                .name(name)
                .email(email)
                .password("1234")
                .phoneNumber(phoneNumber)
                .build();
        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signUpRequest)));

        //then
        result.andDo(print())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(409)));
    }

    @Test
    @DisplayName("회원가입 실패 테스트(잘못된 파라미터:이메일)")
    void 회원가입실패_잘못된이메일() throws Exception {
        String email = "theraonnaver.com";
        String body = " {\"email\":\""+ email+ "\",\"password\":\"1234\",\"name\":\"raon\","+"" +
                "\"phoneNumber\":\"010-1234-1111\",\"accumulationRate\":5,\"createdTime\":null}";
        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(body));

        //then
        result.andDo(print())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("회원가입 실패 테스트(잘못된 파라미터:전화번호)")
    void 회원가입실패_잘못된전화번호() throws Exception {
        String phoneNumber = "01111-11111";
        String body = " {\"email\":\"theraon@naver.com\",\"password\":\"1234\",\"name\":\"raon\","+"" +
                "\"phoneNumber\":\"" + phoneNumber + "\",\"accumulationRate\":5,\"createdTime\":null}";


        //when
        ResultActions result = mockMvc.perform(
                post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(body));

        //then
        result.andDo(print())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(400)));
    }
}
