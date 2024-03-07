package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SquadMemberNotFoundException extends RuntimeException {

  public SquadMemberNotFoundException(Integer squadId) {
    super(String.format("Squad member with ID: %d does not exist.", squadId));
  }

  public SquadMemberNotFoundException(Integer gameId, Integer squadId) {
    super(String.format("Squad member with ID: %d in game: %d does not exist.", squadId, gameId));
  }
}
