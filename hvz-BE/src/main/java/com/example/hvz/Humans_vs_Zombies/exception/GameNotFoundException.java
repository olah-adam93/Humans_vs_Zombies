package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GameNotFoundException extends RuntimeException {

  public GameNotFoundException(Integer gameId) {
    super(String.format("Game with ID: %d does not exist.", gameId));
  }
}
