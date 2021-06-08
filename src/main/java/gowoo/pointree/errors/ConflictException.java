package gowoo.pointree.errors;

/*
*   값 중복이나 충돌이 일어났을때 발생
* */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message, Throwable cause) {
        super(message, cause);
    }

}