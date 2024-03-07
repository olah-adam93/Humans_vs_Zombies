package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SquadNotFoundException extends RuntimeException {

  public SquadNotFoundException(Integer squadId) {
    super(String.format("Squad with ID: %d does not exist.", squadId));
  }

  public SquadNotFoundException(Integer gameId, Integer squadId) {
    super(String.format("Squad with ID: %d in game: %d does not exist.", squadId, gameId));
  }

  public SquadNotFoundException(Integer gameId, String squadName) {
    super(String.format("Squad with name: %s in game: %d does not exist.", squadName, gameId));
  }
}
