package gowoo.pointree.commons;

import com.fasterxml.jackson.databind.ObjectMapper;
import gowoo.pointree.configs.JwtTokenConfig;
import gowoo.pointree.security.Jwt;
import org.junit.jupiter.api.Disabled;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.stream.Stream;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("Test")
@Disabled
public class BaseTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    protected JwtTokenConfig jwtTokenConfig;

    @Autowired
    protected Jwt jwt;

    public String genreatedToken(){
        String token = "Bearer " + jwt.create(new Jwt.Claims(1L,"tester", Stream.of("ROLE_USER").toArray(String[]::new)));
        return token;
    }
}