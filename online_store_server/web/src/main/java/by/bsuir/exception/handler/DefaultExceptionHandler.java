package by.bsuir.exception.handler;


import by.bsuir.exception.ControllerException;
import by.bsuir.exception.IllegalRequestException;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.DataBinder;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@ControllerAdvice
public class DefaultExceptionHandler {

    private static final Logger logger = LogManager.getLogger(DefaultExceptionHandler.class);

    @InitBinder
    private void activateDirectFieldAccess(DataBinder dataBinder) {
        dataBinder.initDirectFieldAccess();
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, BindException.class,
            UnsatisfiedServletRequestParameterException.class, IllegalArgumentException.class,
            MethodArgumentTypeMismatchException.class, HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ErrorMessage> handleJsonMappingException(Exception e) {
        /*
         * Exception occurs when passed id is null. Status 400.
         */
        logger.error(e.getMessage());
        return new ResponseEntity<>(new ErrorMessage("Request parameters are not valid!"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ErrorMessage> handleResourceNotFound(ResourceNotFoundException e) {
        /*
         * Exception occurs when passed id is null. Status 404.
         */
        logger.error(e.getMessage());
        String message = Objects.isNull(e.getMessage()) ? "" : e.getMessage();
        return new ResponseEntity<>(new ErrorMessage("Resource not found! " + message), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ServiceException.class, ControllerException.class})
    public ResponseEntity<ErrorMessage> handleServiceException(Exception e) {
        /* Handles service exception. Status code 400. */
        logger.error(e.getMessage());
        return new ResponseEntity<>(new ErrorMessage(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalRequestException.class)
    public ResponseEntity<List<String>> handleValidation(IllegalRequestException e) {
        /*
         * Validation exceptions handling. Status code 400.
         */
        List<String> errors = new ArrayList<>();
        e.getErrors().forEach(er -> errors.add(String.format("Incorrect value for field %s : '%s'. %s.", er.getField(),
                er.getRejectedValue(), er.getDefaultMessage())));
        if (Objects.nonNull(e.getMessage())) {
            errors.add(0, e.getMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> handleConstraintViolationException(ConstraintViolationException e) {
        logger.error(e.getMessage());
        List<String> errors = new ArrayList<>();
        e.getConstraintViolations().forEach(er -> errors.add(er.getMessageTemplate()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public void handleAccessDeniedException(HttpServletResponse httpServletResponse,
                                            AccessDeniedException ex) throws IOException {
        /*
         * Handles AccessDeniedException exceptions. Status code 403.
         */
        logger.error(ex.getMessage());
        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permissions!");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorMessage> handleBadCredentialsException(BadCredentialsException ex) {
        /*
         * Handles AccessDeniedException exceptions. Status code 403.
         */
        return new ResponseEntity<>(new ErrorMessage("Email or password is not valid!"), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleOthersException(Exception e) {
        /* Handles all other exceptions. Status code 500. */
        e.printStackTrace();
        logger.error(e.getMessage());
        return new ResponseEntity<>(new ErrorMessage("Internal server error."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
