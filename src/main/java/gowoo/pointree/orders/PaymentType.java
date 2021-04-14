package gowoo.pointree.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public enum PaymentType {
    CASH("CASH"),
    CARD("CARD");

    private final String description;
}
