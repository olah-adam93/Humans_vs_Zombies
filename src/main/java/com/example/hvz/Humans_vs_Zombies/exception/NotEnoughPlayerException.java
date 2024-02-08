package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class NotEnoughPlayerException extends RuntimeException {
  public NotEnoughPlayerException() {
    super("At least 3 players needed to start a HvZ game.");
  }
}
