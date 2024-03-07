package com.example.hvz.Humans_vs_Zombies.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ChatNotFoundException extends RuntimeException {

  public ChatNotFoundException(Integer chatId) {
    super(String.format("Chat with ID: %d does not exist.", chatId));
  }

  public ChatNotFoundException(Integer gameId, String faction) {
    super(String.format("Chat with gameId: %d and faction: %s does not exist.", gameId, faction));
  }
}
