package gowoo.pointree.customers;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CustomerControllerTest extends BaseTest {
    @Test
    @Order(1)
    @DisplayName("고객 등록 성공 테스트")
    void insertCustomerSuccessTest() throws Exception{
        //given
        String phoneNumber = "010-3333-3333";
        String request = "{\"phoneNumber\":\"" + phoneNumber +"\"}";

        //when
        ResultActions result = mockMvc.perform(
                post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("insertCustomer"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id").exists())
                .andExpect(jsonPath("$.response.phoneNumber",is(phoneNumber)))
                .andExpect(jsonPath("$.response.purchaseCnt",is(0)))
                .andExpect(jsonPath("$.response.totalPoint",is(0)))
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("고객 등록 실패 테스트(잘못된 전화번호)")
    void insertCustomerFailTest1() throws Exception{
        //given
        String phoneNumber = "010-1111-11111";
        String request = "{\"phoneNumber\":\"" + phoneNumber +"\"}";

        //when
        ResultActions result = mockMvc.perform(
                post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken())
                        .content(request));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("잘못된 값입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @Order(2)
    @DisplayName("모든 고객정보조회 성공테스트")
    void getCustomersSuccessTest() throws Exception{
        //given & when
        ResultActions result = mockMvc.perform(
                get("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("getCustomers"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response[0].id").exists())
                .andExpect(jsonPath("$.response[0].phoneNumber",is("010-1111-1111")))
                .andExpect(jsonPath("$.response[0].purchaseCnt",is(0)))
                .andExpect(jsonPath("$.response[0].totalPoint",is(0)))
                .andExpect(jsonPath("$.response[0].createdTime").exists())
                .andExpect(jsonPath("$.response[1].id").exists())
                .andExpect(jsonPath("$.response[1].phoneNumber",is("010-2222-2222")))
                .andExpect(jsonPath("$.response[1].purchaseCnt",is(0)))
                .andExpect(jsonPath("$.response[1].totalPoint",is(0)))
                .andExpect(jsonPath("$.response[1].createdTime").exists());
    }

    @Test
    @DisplayName("한명 고객정보조회 성공테스트")
    void getCustomerSuccessTest() throws Exception{
        //given
        int customeId = 1;
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/"+customeId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("getCustomer"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id",is(customeId)))
                .andExpect(jsonPath("$.response.phoneNumber",is("010-1111-1111")))
                .andExpect(jsonPath("$.response.purchaseCnt",is(0)))
                .andExpect(jsonPath("$.response.totalPoint",is(0)))
                .andExpect(jsonPath("$.response.createdTime").exists());
    }
}
