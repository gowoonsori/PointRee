package gowoo.pointree.customers;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CustomerDeleteControllerTest extends BaseTest {
        @Autowired
        CustomerRepository customerRepository;

    @Test
    @DisplayName("한명 고객삭제 성공")
    void deleteCustomerSuccessTest() throws Exception {
        //given
        String customerIds = "[1]";

        //when
        ResultActions result = mockMvc.perform(
                delete("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(customerIds)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response", is("정상적으로 삭제되었습니다.")));

        mockMvc.perform(
                get("/api/customers/"+"1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()))
                .andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("여러명 고객삭제 성공")
    void deleteCustomerSuccessTest2() throws Exception {
        //given
        String customerIds = "[1,2]";

        //when
        ResultActions result = mockMvc.perform(
                delete("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(customerIds)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response", is("정상적으로 삭제되었습니다.")));

        mockMvc.perform(
                    get("/api/customers/"+"1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()))
                .andDo(print())
                    .andExpect(status().is4xxClientError())
                    .andExpect(jsonPath("$.success", is(false)))
                    .andExpect(jsonPath("$.error").exists())
                    .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                    .andExpect(jsonPath("$.error.status", is(400)));
    }
}
