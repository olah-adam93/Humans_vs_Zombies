package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
import com.example.hvz.Humans_vs_Zombies.mapper.ChatMapper;
import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.model.DTO.ChatDTO;
import com.example.hvz.Humans_vs_Zombies.service.WebSocketService;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.net.URI;
import java.util.Collection;
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

  @Operation(summary = "Get all Messages")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = {
              @Content(
                  mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = ChatDTO.class)))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Game does not exist with supplied ID",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @GetMapping(path = "/{gameId}/chat") // api/game/1/chat?faction=global
  public ResponseEntity findAllByGameIdAndFaction(
      @PathVariable("gameId") Integer gameId, @RequestParam String faction) {
    Collection<ChatDTO> chatDTOs =
        chatMapper.chatToChatDto(chatService.findAllByGameIdAndFaction(gameId, faction));
    return ResponseEntity.ok(chatDTOs);
  }

  @Operation(summary = "Add a new Message")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "The message is successfully added",
            content = @Content),
        @ApiResponse(
            responseCode = "400",
            description = "Malformed request",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = BadRequestException.class))
            })
      })
  @PostMapping("/{gameId}/chat")
  public ResponseEntity add(@PathVariable("gameId") Integer gameId, @RequestBody ChatDTO chatDTO) {
    Chat chat = chatService.add(chatMapper.chatDtoToChat(chatDTO));

    // Send WebSocket message based on faction
    switch (chatDTO.getFaction()) {
      case "global":
      case "zombie":
      case "human":
        webSocketService.sendMessage("chat/" + gameId, chatDTO.getFaction());
        break;
      default:
        throw new BadRequestException();
    }

    URI location = URI.create("/chat" + chat.getId());
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Delete a specific Message by ID")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = ChatDTO.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "No chat associated with the given ID",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @DeleteMapping("/{gameId}/chat/{chatId}")
  public ResponseEntity delete(@PathVariable("chatId") int chatId) {
    chatService.deleteById(chatId);
    return ResponseEntity.noContent().build();
  }
}
