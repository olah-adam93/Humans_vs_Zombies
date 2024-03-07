package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class KillNotFoundException extends RuntimeException {

  public KillNotFoundException(Integer gameId) {
    super(String.format("Kill with ID: %d does not exist.", gameId));
  }

  public KillNotFoundException(Integer killId, Integer gameId) {
    super(String.format("Kill with ID: %d and gameId: %d does not exist.", killId, gameId));
  }
}
