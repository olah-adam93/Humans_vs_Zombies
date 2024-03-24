package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.mapper.PlayerMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.CreatePlayerDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerAdminDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.WebSocketService;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.loginuser.LoginUserService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import io.swagger.v3.oas.annotations.Operation;
import java.net.URI;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping(path = "api/game")
public class PlayerController {
  private final PlayerService playerService;
  private final PlayerMapper playerMapper;
  private final LoginUserService loginUserService;
  private final GameService gameService;
  private final WebSocketService webSocketService;
  private final SquadMemberService squadMemberService;
  private final ChatService chatService;

  public PlayerController(
      PlayerService playerService,
      PlayerMapper playerMapper,
      LoginUserService loginUserService,
      GameService gameService,
      WebSocketService webSocketService,
      SquadMemberService squadMemberService,
      ChatService chatService) {
    this.playerService = playerService;
    this.playerMapper = playerMapper;
    this.loginUserService = loginUserService;
    this.gameService = gameService;
    this.webSocketService = webSocketService;
    this.squadMemberService = squadMemberService;
    this.chatService = chatService;
  }

  @Operation(summary = "Get all players in a game")
  @GetMapping("/{gameId}/player")
  public ResponseEntity<Collection<PlayerAdminDTO>> findAllByGameId(
      @PathVariable("gameId") Integer gameId) {

    Collection<PlayerAdminDTO> playerAdminDTOs =
        playerMapper.playerToPlayerAdminDto(playerService.findAllByGameId(gameId));
    return ResponseEntity.ok(playerAdminDTOs);
  }

  @Operation(summary = "Get a specific player by ID")
  @GetMapping("/{gameId}/player/{playerId}")
  public ResponseEntity<PlayerDTO> findByPlayerId(
      @PathVariable("gameId") int gameId, @PathVariable("playerId") int playerId) {

    PlayerDTO playerDTO =
        playerMapper.playerToPlayerDto(playerService.findByGameIdAndId(gameId, playerId));
    return ResponseEntity.ok(playerDTO);
  }

  @Operation(summary = "Add new player")
  @PostMapping("{gameId}/player")
  public ResponseEntity<Void> add(
      @PathVariable("gameId") int gameId, @RequestBody CreatePlayerDTO createPlayerDTO) {
    Game game = gameService.findById(gameId);

    createPlayerDTO.setLoginUser(
        loginUserService.findByKeycloakId(createPlayerDTO.getKeycloakId()).getId());
    createPlayerDTO.setBiteCode(playerService.createRandomBiteCode());

    Player player = playerService.add(playerMapper.createPlayerDtoToPlayer(createPlayerDTO));
    game.setHumanCount(game.getHumanCount() + 1);
    gameService.update(game);
    URI location = URI.create(gameId + "/player/" + player.getId());
    webSocketService.sendMessage("game", "create_player");
    webSocketService.sendMessage("game/" + gameId, "create_player");
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Update a player")
  @PutMapping("/{gameId}/player/{playerId}")
  public ResponseEntity<PlayerDTO> update(
      @RequestBody PlayerDTO playerDTO, @PathVariable("playerId") int playerId) {
    playerDTO.setId(playerId);
    playerService.update(playerMapper.playerDtoToPlayer(playerDTO));
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Delete a specific player by ID")
  @DeleteMapping(path = "/{gameId}/player/{playerId}")
  public ResponseEntity<Void> delete(
      @PathVariable("gameId") int gameId, @PathVariable("playerId") int playerId) {
    Game game = gameService.findById(gameId);
    Player player = playerService.findByGameIdAndId(gameId, playerId);
    if (player.getSquadMember() != null) {
      squadMemberService.deleteById(squadMemberService.findByPlayer_Id(playerId).getId());
    }
    if (player.isHuman()) {
      game.setHumanCount(game.getHumanCount() - 1);
    }
    chatService.findAllByGameId(gameId).forEach(chatService::delete);
    playerService.deleteById(playerId);
    webSocketService.sendMessage("game", "delete_players");
    webSocketService.sendMessage("game/" + gameId, "create_player");
    return ResponseEntity.noContent().build();
  }
}
