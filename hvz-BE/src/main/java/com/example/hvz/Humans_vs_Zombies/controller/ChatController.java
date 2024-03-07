package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.mapper.ChatMapper;
import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.model.DTO.ChatDTO;
import com.example.hvz.Humans_vs_Zombies.service.WebSocketService;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import java.net.URI;
import java.util.Collection;
import lombok.SneakyThrows;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping(path = "api/game")
public class ChatController {
  private final ChatMapper chatMapper;
  private final ChatService chatService;
  private final WebSocketService webSocketService;

  public ChatController(
      ChatMapper chatMapper, ChatService chatService, WebSocketService webSocketService) {
    this.chatMapper = chatMapper;
    this.chatService = chatService;
    this.webSocketService = webSocketService;
  }

  @Operation(summary = "Get all messages")
  @GetMapping(path = "/{gameId}/chat") // api/game/1/chat?faction=global
  public ResponseEntity<Collection<ChatDTO>> findAllByGameIdAndFaction(
      @PathVariable("gameId") Integer gameId, @RequestParam String faction) {
    Collection<ChatDTO> chatDTOs =
        chatMapper.chatToChatDto(chatService.findAllByGameIdAndFaction(gameId, faction));
    return ResponseEntity.ok(chatDTOs);
  }

  @SneakyThrows
  @Operation(summary = "Add new message")
  @PostMapping("/{gameId}/chat")
  public ResponseEntity<Void> add(
      @PathVariable("gameId") Integer gameId, @RequestBody ChatDTO chatDTO) {
    Chat chat = chatService.add(chatMapper.chatDtoToChat(chatDTO));

    // Send WebSocket message based on faction
    switch (chatDTO.getFaction()) {
      case "global":
      case "zombie":
      case "human":
        webSocketService.sendMessage("chat/" + gameId, chatDTO.getFaction());
        break;
      default:
        throw new BadRequestException("Invalid faction provided");
    }

    URI location = URI.create("/chat" + chat.getId());
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Delete a specific message by ID")
  @DeleteMapping("/{gameId}/chat/{chatId}")
  public ResponseEntity<Void> delete(@PathVariable("chatId") int chatId) {
    chatService.deleteById(chatId);
    return ResponseEntity.noContent().build();
  }
}
