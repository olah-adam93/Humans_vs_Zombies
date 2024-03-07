package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PlayerNotFoundException extends RuntimeException {

  public PlayerNotFoundException(Integer playerId) {
    super(String.format("Player with ID: %d does not exist.", playerId));
  }

  public PlayerNotFoundException(Integer playerId, Integer gameId) {
    super(String.format("Player with id: %d in game: %d does not exist.", playerId, gameId));
  }
}
