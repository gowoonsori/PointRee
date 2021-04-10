package gowoo.pointree.users;

import gowoo.pointree.errors.BadRequestException;
import lombok.Builder;
import lombok.Getter;

import static java.util.regex.Pattern.matches;

@Getter @Builder
public class UpdateInfoRequest {
    private String email;

    private String password;

    private String name;

    private String phoneNumber;

    private Integer accumulationRate;

    public UpdateInfoRequest(String email, String password, String name, String phoneNumber, Integer accumulationRate) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.accumulationRate = accumulationRate;
        validate();
    }

    private void validate() {
        if (email != null && !matches( "[\\w~\\-.+]+@[\\w~\\-]+(\\.[\\w~\\-]+)+", email)) throw new BadRequestException("유효하지 않은 email 형식입니다.");
        if (password != null && (password.length()<8 || password.length() >16 )) throw new BadRequestException("유효하지 않은 password 형식입니다.");
        if (phoneNumber != null && !matches("^(01\\d{1}|02|0505|0502|0506|0\\d{1,2})-?(\\d{3,4})-?(\\d{4})",phoneNumber)) throw new BadRequestException("유효하지 않은 전화번호 형식입니다.");
        if (accumulationRate != null && accumulationRate < 0 || accumulationRate > 100) throw new BadRequestException("0~100까지만 입력 가능합니다.");
    }
}
