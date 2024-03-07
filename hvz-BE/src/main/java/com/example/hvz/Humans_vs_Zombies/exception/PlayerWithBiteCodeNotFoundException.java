package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PlayerWithBiteCodeNotFoundException extends RuntimeException {
  public PlayerWithBiteCodeNotFoundException(String biteCode) {
    super(String.format("Player with bite code: %s does not exist", biteCode));
  }

  public PlayerWithBiteCodeNotFoundException(Integer gameId, String biteCode) {
    super(String.format("Player with bite code: %s in game: %d does not exist", biteCode, gameId));
  }
}
