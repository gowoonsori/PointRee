package gowoo.pointree.orders;

import gowoo.pointree.commons.BaseTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
public class OrderControllerTest extends BaseTest {
    @Test
    @DisplayName("한개 구매내역 조회 성공 테스트")
    void getOrderSuccessTest() throws Exception {
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 1;

        ResultActions result = mockMvc.perform(
                get("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(orderId)))
                .andExpect(jsonPath("$.response.price", is(12000)))
                .andExpect(jsonPath("$.response.accumulationRate", is(5)))
                .andExpect(jsonPath("$.response.paymentType", is("CASH")));
    }

    @Test
    @DisplayName("한개 구매내역 조회 실패 테스트(없거나 자기의 고객이 아닌경우")
    void getOrderFailTest() throws Exception {
        //given
        String token = genreatedToken();
        int orderId = 5;
        int customerId = 1;

        //when
        ResultActions result = mockMvc.perform(
                get("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));

        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("요청하신 구매내역은 존재하지 않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("한명의 고객의 모든 구매내역 조회 성공 테스트")
    void getOrdersSuccessTest() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 1;

        //when
        ResultActions result = mockMvc.perform(
                get("/api/customers/" + customerId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response[0].id", is(1)))
                .andExpect(jsonPath("$.response[0].price", is(12000)))
                .andExpect(jsonPath("$.response[0].accumulationRate", is(5)))
                .andExpect(jsonPath("$.response[0].paymentType", is("CASH")))
                .andExpect(jsonPath("$.response[1].id", is(2)))
                .andExpect(jsonPath("$.response[1].price", is(20000)))
                .andExpect(jsonPath("$.response[1].accumulationRate", is(5)))
                .andExpect(jsonPath("$.response[1].paymentType", is("CASH")))
                .andExpect(jsonPath("$.response[2].id", is(3)))
                .andExpect(jsonPath("$.response[2].price", is(21000)))
                .andExpect(jsonPath("$.response[2].accumulationRate", is(10)))
                .andExpect(jsonPath("$.response[2].paymentType", is("CARD")));
    }

    @Test
    @DisplayName("한명의 고객의 모든 구매내역 조회 실패 테스트(사용자의 고객id아닐경우)")
    void getOrdersFailTest() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 3;

        //when
        ResultActions result = mockMvc.perform(
                get("/api/customers/" + customerId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));

        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("구매내역 등록 성공 테스트")
    void postOrderSuccessTest() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 1;
        int accumulationRate = 5;
        int price = 30000;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                post("/api/customers/" + customerId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(6)))
                .andExpect(jsonPath("$.response.price", is(price)))
                .andExpect(jsonPath("$.response.accumulationRate", is(accumulationRate)))
                .andExpect(jsonPath("$.response.paymentType", is(PaymentType.CARD.getDescription())));
        mockMvc.perform(
                get("/api/customers/" + customerId + "/orders/" + 6)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token))
                .andDo(print())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(6)))
                .andExpect(jsonPath("$.response.price", is(price)))
                .andExpect(jsonPath("$.response.accumulationRate", is(accumulationRate)))
                .andExpect(jsonPath("$.response.paymentType", is(PaymentType.CARD.getDescription())));

        mockMvc.perform(
                get("/api/customers/" + customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token))
                .andDo(print())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(customerId)))
                .andExpect(jsonPath("$.response.totalPoint", is(3700 + 1500)));
    }

    @Test
    @DisplayName("구매내역 등록 실패 테스트(없는 customerId)")
    void postOrderFailTest1() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 10;
        int accumulationRate = 5;
        int price = 30000;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                post("/api/customers/" + customerId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("구매내역 등록 실패 테스트(잘못된 입력 양식)")
    void postOrderFailTest2() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 1;
        int accumulationRate = 101;  //0<= x <= 100 이어야 한다.
        int price = 30000;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                post("/api/customers/" + customerId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("잘못된 값입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("구매 내역 수정 성공 테스트")
    void updateOrderSuccessTest() throws Exception {
        //given
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 1;
        int accumulationRate = 10;      //적립율 수정
        int price = 12000;
        int savePoint = price/100 * accumulationRate;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(orderId)))
                .andExpect(jsonPath("$.response.price", is(price)))
                .andExpect(jsonPath("$.response.savePoint",is(savePoint)))
                .andExpect(jsonPath("$.response.accumulationRate", is(accumulationRate)))
                .andExpect(jsonPath("$.response.paymentType", is(PaymentType.CARD.getDescription())));
        mockMvc.perform(
                get("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token))
                .andDo(print())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(orderId)))
                .andExpect(jsonPath("$.response.price", is(price)))
                .andExpect(jsonPath("$.response.savePoint",is(savePoint)))
                .andExpect(jsonPath("$.response.accumulationRate", is(accumulationRate)))
                .andExpect(jsonPath("$.response.paymentType", is(PaymentType.CARD.getDescription())));

        mockMvc.perform(
                get("/api/customers/" + customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token))
                .andDo(print())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id", is(customerId)))
                .andExpect(jsonPath("$.response.totalPoint", is(3100 + savePoint)));
    }

    @Test
    @DisplayName("구매 내역 수정 실패 테스트(없는 id)")
    void updateOrderFailTest1() throws Exception {
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 10;           //없는 id
        int accumulationRate = 10;
        int price = 12000;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("구매내역을 찾을 수 없습니다.")))
                .andExpect(jsonPath("$.error.status", is(404)));
    }

    @Test
    @DisplayName("구매 내역 수정 실패 테스트(잘못된 입력형식)")
    void updateOrderFailTest2() throws Exception {
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 10;
        int accumulationRate = 101; //적립율 초과
        int price = 12000;
        Order.Request order = new Order.Request(price, accumulationRate,PaymentType.CARD);

        //when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token)
                        .content(objectMapper.writeValueAsString(order)));

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("잘못된 값입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("구매 내역 삭제 성공 테스트")
    void deleteOrderSuccessTest() throws Exception {
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 1;

        //when
        ResultActions result = mockMvc.perform(
                delete("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));

        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response", is(true)));
    }

    @Test
    @DisplayName("구매내역 삭제 실패 테스트(없는 구매내역 id)")
    void deleteOrderFailTest() throws Exception{
        String token = genreatedToken();
        int customerId = 1;
        int orderId = 10;

        //when
        ResultActions result = mockMvc.perform(
                delete("/api/customers/" + customerId + "/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(), token));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.status", is(404)));
    }
}
