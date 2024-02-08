package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoPlayerWithBiteCodeException extends RuntimeException {
  public NoPlayerWithBiteCodeException(String biteCode) {
    super("Player with bite code: " + biteCode + " does not exist");
  }
}
