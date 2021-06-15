package gowoo.pointree.customers;

import gowoo.pointree.commons.BaseTest;
import gowoo.pointree.users.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.stream.IntStream;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CustomerControllerTest extends BaseTest {

    @Autowired
    CustomerRepository customerRepository;

    @Test
    @Order(1)
    @DisplayName("고객등록 성공")
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
    @DisplayName("고객 등록 실패(잘못된 전화번호)")
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
    @DisplayName("모든 고객정보조회 성공")
    void getCustomersSuccessTest() throws Exception{
        //given & when
        ResultActions result = mockMvc.perform(
                get("/api/customers/all")
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
                .andExpect(jsonPath("$.response[0].purchaseCnt").exists())
                .andExpect(jsonPath("$.response[0].totalPoint").exists())
                .andExpect(jsonPath("$.response[0].createdTime").exists())
                .andExpect(jsonPath("$.response[1].id").exists())
                .andExpect(jsonPath("$.response[1].phoneNumber",is("010-2222-2222")))
                .andExpect(jsonPath("$.response[1].purchaseCnt").exists())
                .andExpect(jsonPath("$.response[1].totalPoint").exists())
                .andExpect(jsonPath("$.response[1].createdTime").exists());
    }

    @Test
    @DisplayName("한명 고객정보조회 성공")
    void getCustomerSuccessTest() throws Exception{
        //given
        int customerId = 1;
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/"+customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("getCustomer"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id",is(customerId)))
                .andExpect(jsonPath("$.response.phoneNumber",is("010-1111-1111")))
                .andExpect(jsonPath("$.response.purchaseCnt").exists())
                .andExpect(jsonPath("$.response.totalPoint").exists())
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("한명 고객정보조회 실패(db에 없는 고객id)")
    void getCustomerFailTest1() throws Exception{
        //given
        int customerId = 1242;
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/"+customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("한명 고객정보조회 실패(다른User의 고객id)")
    void getCustomerFailTest2() throws Exception{
        //given
        int customerId = 3;
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/"+customerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("전화번호로 한명 고객정보조회 성공")
    void getCustomerAtPhoneNumberSuccessTest1() throws Exception{
        //given
        String phoneNumber = "010-1111-1111";
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/phoneNumber/"+phoneNumber)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("getCustomerAtPhoneNumber"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id").exists())
                .andExpect(jsonPath("$.response.phoneNumber",is(phoneNumber)))
                .andExpect(jsonPath("$.response.purchaseCnt").exists())
                .andExpect(jsonPath("$.response.totalPoint").exists())
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("전화번호로 한명 고객정보조회 성공(없으면 자동 생성)")
    void getCustomerAtPhoneNumberSuccessTest2() throws Exception{
        //given
        String phoneNumber = "010-1111-1234";
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/phoneNumber/"+phoneNumber)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("getCustomerAtPhoneNumber"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id").exists())
                .andExpect(jsonPath("$.response.phoneNumber",is(phoneNumber)))
                .andExpect(jsonPath("$.response.purchaseCnt").exists())
                .andExpect(jsonPath("$.response.totalPoint").exists())
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("전화번호로 한명 고객정보조회 실패(잘못된 형식)")
    void getCustomerAtPhoneNumberFailTest() throws Exception{
        //given
        String phoneNumber = "010-1111-12";
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers/phoneNumber/"+phoneNumber)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("유효하지 않은 전화번호 형식입니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }


    @Test
    @Order(2)
    @DisplayName("30개의 고객정보 10개씩 첫번째 페이지 조회성공")
    void getCutomerPagingSuccessTest() throws Exception{
        //given
        IntStream.range(0,30).forEach(i -> this.generateCustomer(i));
        // when
        ResultActions result = mockMvc.perform(
                get("/api/customers")
                            .param("page","0")
                            .param("size","10")
                            .param("sort","id,ASC")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("queryCustomers"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.content.[0].id").exists())
                .andExpect(jsonPath("$.response.content.[0].phoneNumber",is("010-1111-1111")))
                .andExpect(jsonPath("$.response.content.[0].purchaseCnt").exists())
                .andExpect(jsonPath("$.response.content.[0].totalPoint").exists())
                .andExpect(jsonPath("$.response.content.[0].createdTime").exists())
                .andExpect(jsonPath("$.response.content.[1].id").exists())
                .andExpect(jsonPath("$.response.content.[1].phoneNumber",is("010-2222-2222")))
                .andExpect(jsonPath("$.response.content.[1].purchaseCnt").exists())
                .andExpect(jsonPath("$.response.content.[1].totalPoint").exists())
                .andExpect(jsonPath("$.response.content.[1].createdTime").exists())
                .andExpect(jsonPath("$.response.pageable.sort").exists())
                .andExpect(jsonPath("$.response.pageable.offset").exists())
                .andExpect(jsonPath("$.response.pageable.pageSize").exists())
                .andExpect(jsonPath("$.response.pageable.pageNumber").exists())
                .andExpect(jsonPath("$.response.totalPages").exists())
                .andExpect(jsonPath("$.response.totalElements").exists())
                .andExpect(jsonPath("$.response.size").exists())
                .andExpect(jsonPath("$.response.number").exists())
                .andExpect(jsonPath("$.response.sort").exists())
        ;
    }

    @Test
    @DisplayName("포인트 사용 성공")
    void usePointSuccessTest() throws Exception{
        //given
        int customerId = 1;
        int point = 3000;
        // when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/"+customerId+"?point="+point)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(CustomerController.class))
                .andExpect(handler().methodName("usePoints"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.id",is(customerId)))
                .andExpect(jsonPath("$.response.phoneNumber",is("010-1111-1111")))
                .andExpect(jsonPath("$.response.purchaseCnt").exists())
                .andExpect(jsonPath("$.response.totalPoint",is(700)))
                .andExpect(jsonPath("$.response.createdTime").exists());
    }

    @Test
    @DisplayName("포인트 사용 실패(없는 id)")
    void usePointFailTest1() throws Exception{
        //given
        int customerId = 12;
        int point = 3000;
        // when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/"+customerId+"?point="+point)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("해당 고객이 존재하지않습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    @Test
    @DisplayName("포인트 사용 실패(적립 포인트보다 많은 사용요청)")
    void usePointFailTest2() throws Exception{
        //given
        int customerId = 1;
        int point = 10000;
        // when
        ResultActions result = mockMvc.perform(
                patch("/api/customers/"+customerId+"?point="+point)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(jwtTokenConfig.getHeader(),genreatedToken()));
        //then
        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.message", is("적립된 포인트금액보다 많습니다.")))
                .andExpect(jsonPath("$.error.status", is(400)));
    }

    private Customer generateCustomer(int i){
        int n = 1000 + i;
        Customer customer = Customer.builder()
                .phoneNumber("010-1111-"+n)
                .purchaseCnt(0)
                .totalPoint(0)
                .user(User.builder().id(1L).build())
                .build();
        return this.customerRepository.save(customer);
    }

}
