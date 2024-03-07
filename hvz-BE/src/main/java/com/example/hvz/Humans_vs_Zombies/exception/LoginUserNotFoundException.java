package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class LoginUserNotFoundException extends RuntimeException {

  public LoginUserNotFoundException(Integer userId) {
    super(String.format("Login user with ID: %d does not exist.", userId));
  }

  public LoginUserNotFoundException(String keycloakId) {
    super(String.format("Login user with keycloakID: %s does not exist.", keycloakId));
  }

  public LoginUserNotFoundException(Integer gameId, Integer userId) {
    super(String.format("Login user with ID: %d in game: %d does not exist.", userId, gameId));
  }
}
