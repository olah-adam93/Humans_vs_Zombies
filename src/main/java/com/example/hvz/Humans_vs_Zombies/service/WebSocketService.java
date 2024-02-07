package com.example.hvz.Humans_vs_Zombies.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

  private final SimpMessagingTemplate messagingTemplate;

  public WebSocketService(final SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  public void sendMessage(final String topicSuffix) {
    messagingTemplate.convertAndSend("/topic/" + topicSuffix, "refresh_game");
  }

  public void sendMessage(final String topicSuffix, final String payload) {
    messagingTemplate.convertAndSend("/topic/" + topicSuffix, payload);
  }
}
