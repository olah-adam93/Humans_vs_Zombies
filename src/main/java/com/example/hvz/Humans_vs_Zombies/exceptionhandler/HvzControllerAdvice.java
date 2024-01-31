package com.example.hvz.Humans_vs_Zombies.exceptionhandler;

import com.example.hvz.Humans_vs_Zombies.config.HvzErrorResponse;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HvzControllerAdvice {

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<HvzErrorResponse> handleConstraintViolationException(
      ConstraintViolationException exception) {
    List<String> errors =
        exception.getConstraintViolations().stream()
            .map(
                cv ->
                    cv.getRootBeanClass().getName()
                        + " "
                        + cv.getPropertyPath()
                        + ": "
                        + cv.getMessage())
            .toList();
    HvzErrorResponse errorResponse =
        new HvzErrorResponse(HttpStatus.BAD_REQUEST, exception.getMessage(), errors);
    return new ResponseEntity<>(errorResponse, new HttpHeaders(), errorResponse.getStatus());
  }
}
