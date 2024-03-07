package com.example.hvz.Humans_vs_Zombies.exceptionhandler;

import com.example.hvz.Humans_vs_Zombies.config.HvzErrorResponse;
import com.example.hvz.Humans_vs_Zombies.exception.*;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HvzGlobalExceptionHandler {

  @ExceptionHandler({
    ChatNotFoundException.class,
    GameNotFoundException.class,
    KillNotFoundException.class,
    LoginUserNotFoundException.class,
    PlayerNotFoundException.class,
    PlayerWithBiteCodeNotFoundException.class,
    SquadMemberNotFoundException.class,
    SquadNotFoundException.class,
    MalformedRequestException.class
  })
  public ResponseEntity<HvzErrorResponse> handleNotFoundException(RuntimeException ex) {
    return handleErrorResponse(HttpStatus.NOT_FOUND, ex);
  }

  @ExceptionHandler(NotEnoughPlayerException.class)
  public ResponseEntity<HvzErrorResponse> handleNotEnoughPlayerException(
      NotEnoughPlayerException ex) {
    return handleErrorResponse(HttpStatus.BAD_REQUEST, ex);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<HvzErrorResponse> handleConstraintViolationException(
      ConstraintViolationException ex) {
    List<String> errors =
        ex.getConstraintViolations().stream()
            .map(
                cv ->
                    cv.getRootBeanClass().getName()
                        + " "
                        + cv.getPropertyPath()
                        + ": "
                        + cv.getMessage())
            .toList();
    HvzErrorResponse errorResponse =
        new HvzErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), errors);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
  }

  private ResponseEntity<HvzErrorResponse> handleErrorResponse(
      HttpStatus status, RuntimeException ex) {
    HvzErrorResponse errorResponse = new HvzErrorResponse();
    errorResponse.setStatus(status);
    errorResponse.setMessage(ex.getMessage());
    return ResponseEntity.status(status).body(errorResponse);
  }
}
