package by.bsuir.exception.handler;

public class ErrorMessageReponse {

    private String message;

    public ErrorMessageReponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
