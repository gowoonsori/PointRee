package gowoo.pointree.orders;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
public class OrderControllerTest extends BaseTest {
    @Test
    @DisplayName("구매내역 날짜로 조회 성공테스트")
    void getOrderByDateSuccessTest() throws Exception{
        String token = genreatedToken();
        String preDate = "2021-04-12 00:00:00";
        String postDate = "2021-04-13 23:59:59";
        //when
        ResultActions result = mockMvc.perform(
                get("/api/orders/date?preDate="+preDate+"&postDate="+postDate)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response[0].id", is(2)))
                .andExpect(jsonPath("$.response[0].accumulationRate", is(5)))
                .andExpect(jsonPath("$.response[0].paymentType", is("CASH")))
                .andExpect(jsonPath("$.response[0].price", is(20000)))
                .andExpect(jsonPath("$.response[0].savePoint", is(1000)))
                .andExpect(jsonPath("$.response[0].createdTime").exists())
                .andExpect(jsonPath("$.response[0].customerId", is(1)))
                .andExpect(jsonPath("$.response[0].phoneNumber", is("010-1111-1111")))
                .andExpect(jsonPath("$.response[1].id", is(3)))
                .andExpect(jsonPath("$.response[1].accumulationRate", is(10)))
                .andExpect(jsonPath("$.response[1].paymentType", is("CARD")))
                .andExpect(jsonPath("$.response[1].price", is(21000)))
                .andExpect(jsonPath("$.response[1].savePoint", is(2100)))
                .andExpect(jsonPath("$.response[1].createdTime").exists())
                .andExpect(jsonPath("$.response[1].customerId", is(1)))
                .andExpect(jsonPath("$.response[1].phoneNumber", is("010-1111-1111")));
    }
}
