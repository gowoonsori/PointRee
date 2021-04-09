package gowoo.pointree;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class PointreeApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(PointreeApplication.class)
                .properties(
                        "spring.config.location=" +
                        "classpath:/application.yml,"+
                        "classpath:/jdbc.yml").run(args);
    }

}
