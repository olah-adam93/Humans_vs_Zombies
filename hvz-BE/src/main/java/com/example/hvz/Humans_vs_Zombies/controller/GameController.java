package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.exception.GameNotFoundException;
import com.example.hvz.Humans_vs_Zombies.exception.MalformedRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotEnoughPlayerException;
import com.example.hvz.Humans_vs_Zombies.mapper.GameMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.GameDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.WebSocketService;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import com.example.hvz.Humans_vs_Zombies.service.squad.SquadService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import com.example.hvz.Humans_vs_Zombies.validator.CreateGameConstraint;
import com.example.hvz.Humans_vs_Zombies.validator.UpdateGameConstraint;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Collection;
import java.util.Random;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping(path = "api/game")
public class GameController {
  private final GameService gameService;
  private final GameMapper gameMapper;
  private final PlayerService playerService;
  private final SquadService squadService;
  private final WebSocketService webSocketService;
  private final SquadMemberService squadMemberService;
  private final ChatService chatService;

  public GameController(
      GameService gameService,
      GameMapper gameMapper,
      PlayerService playerService,
      SquadService squadService,
      WebSocketService webSocketService,
      SquadMemberService squadMemberService,
      ChatService chatService) {
    this.gameService = gameService;
    this.gameMapper = gameMapper;
    this.playerService = playerService;
    this.squadService = squadService;
    this.webSocketService = webSocketService;
    this.squadMemberService = squadMemberService;
    this.chatService = chatService;
  }

  @Operation(summary = "Get all games")
  @GetMapping
  public ResponseEntity<Collection<GameDTO>> getAll() {
    Collection<GameDTO> gamesDTOs = gameMapper.gameToGameDto(gameService.findAll());
    return ResponseEntity.ok(gamesDTOs);
  }

  @Operation(summary = "Get a game by ID")
  @GetMapping("/{gameId}")
  public ResponseEntity<GameDTO> getById(@PathVariable("gameId") int gameId) {
    GameDTO gameDTO = gameMapper.gameToGameDto(gameService.findById(gameId));
    return ResponseEntity.status(HttpStatus.OK).body(gameDTO);
  }

  @Operation(summary = "Add new game")
  @PostMapping
  public ResponseEntity<Void> add(
      @Validated(CreateGameConstraint.class) @Valid @RequestBody GameDTO gameDTO) {
    gameDTO.setHumanCount(0);
    Game game = gameService.add(gameMapper.gameDtoToGame(gameDTO));
    URI location = URI.create("game/" + game.getId());
    webSocketService.sendMessage("game", "create");
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Update a game")
  @PutMapping("/{gameId}")
  public ResponseEntity<Void> update(
      @Validated(UpdateGameConstraint.class) @Valid @RequestBody GameDTO gameDTO,
      @PathVariable("gameId") int gameId) {
    gameDTO.setId(gameId);
    Game game = gameService.findById(gameId);
    if (game == null) {
      throw new GameNotFoundException(gameId);
    }
    if (gameDTO.getState() != null) {
      switch (gameDTO.getState()) {
        case "In Progress":
          if (game.getPlayers().size() < 3) {
            throw new NotEnoughPlayerException();
          }
          if (!game.getState().equals("Complete") && game.getState().equals("Registration")) {
            gameDTO.setHumanCount(game.getHumanCount() - 1);
            int size = game.getPlayers().size();
            int patientZero = new Random().nextInt(size);
            int currentPlayer = 0;
            for (Player player : game.getPlayers()) {
              if (currentPlayer == patientZero) {
                player.setHuman(false);
                player.setPatientZero(true);
                playerService.update(player);
              }
              currentPlayer++;
            }
          }
          break;
        case "Complete":
        case "Registration":
          break;
        default:
          throw new MalformedRequestException();
      }
    }
    if (gameDTO.getName() == null) {
      gameDTO.setName(game.getName());
    }
    if (gameDTO.getState() == null) {
      gameDTO.setState(game.getState());
    }
    if (gameDTO.getHumanCount() == null) {
      gameDTO.setHumanCount(game.getHumanCount());
    }
    gameService.update(gameMapper.gameDtoToGame(gameDTO));
    webSocketService.sendMessage("game", "update");

    switch (gameDTO.getState()) {
      case "In Progress":
        webSocketService.sendMessage("game/" + gameId, "update_game_start");
        break;
      case "Complete":
        webSocketService.sendMessage("game/" + gameId, "update_game_end");
        break;
      default:
        webSocketService.sendMessage("game/" + gameId, "update");
    }
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Delete a specific game by ID")
  @DeleteMapping("/{gameId}")
  public ResponseEntity<Void> delete(@PathVariable("gameId") int gameId) {
    squadMemberService.findAllByGameId(gameId).forEach(squadMemberService::delete);
    chatService.findAllByGameId(gameId).forEach(chatService::delete);
    playerService.findAllByGameId(gameId).forEach(playerService::delete);
    squadService.findAllByGameId(gameId).forEach(squadService::delete);
    gameService.deleteById(gameId);
    webSocketService.sendMessage("game", "delete");
    webSocketService.sendMessage("game/" + gameId, "delete");
    return ResponseEntity.noContent().build();
  }
}
