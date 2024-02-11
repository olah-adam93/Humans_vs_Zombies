package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NoPlayerWithBiteCodeException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
import com.example.hvz.Humans_vs_Zombies.mapper.KillMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.CreateKillDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.KillDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Kill;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.WebSocketService;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.kill.KillService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping(path = "api/game")
public class KillController {

  private final KillService killService;
  private final PlayerService playerService;
  private final KillMapper killMapper;
  private final GameService gameService;
  private final WebSocketService webSocketService;

  public KillController(
      KillService killService,
      PlayerService playerService,
      KillMapper killMapper,
      GameService gameService,
      WebSocketService webSocketService) {
    this.killService = killService;
    this.playerService = playerService;
    this.killMapper = killMapper;
    this.gameService = gameService;
    this.webSocketService = webSocketService;
  }

  @Operation(summary = "Get all Kills")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = {
              @Content(
                  mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = KillDTO.class)))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Game does not exist with supplied ID.",
            content = {
              @Content(
                  mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = NotFoundException.class)))
            })
      })
  @GetMapping("/{gameId}/kill")
  public ResponseEntity findAllByGameId(@PathVariable("gameId") Integer gameId) {
    Collection<KillDTO> killDTOs = killMapper.killToKillDto(killService.findAllByGameId(gameId));
    return ResponseEntity.ok(killDTOs);
  }

  @Operation(summary = "Get a specific Kill by ID")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = KillDTO.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Kill does not exist with supplied gameId and killId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @GetMapping("/{gameId}/kill/{killId}")
  public ResponseEntity findByGameIdAndKillId(
      @PathVariable("gameId") int gameId, @PathVariable("killId") int killId) {

    KillDTO killDTO = killMapper.killToKillDto(killService.findByGameIdAndKillId(gameId, killId));
    return ResponseEntity.ok(killDTO);
  }

  @Operation(summary = "Add new Kill")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "Kill successfully created.",
            content = @Content),
        @ApiResponse(
            responseCode = "400",
            description = "Malformed request.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NoPlayerWithBiteCodeException.class)),
              @Content(
                  mediaType = "application/json+already+dead",
                  schema = @Schema(implementation = BadRequestException.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Game does not exist with supplied ID.",
            content = {
              @Content(
                  mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = NotFoundException.class)))
            })
      })
  @PostMapping("/{gameId}/kill")
  public ResponseEntity add(
      @PathVariable("gameId") Integer gameId, @Valid @RequestBody CreateKillDTO createKillDTO) {

    Game game = gameService.findById(gameId);
    if (createKillDTO.getKillerId() == null) {
      createKillDTO.setKillerId(-1); // If admin killed killer id is -1
    }
    Player victim = playerService.findByGameIdAndBiteCode(gameId, createKillDTO.getBiteCode());
    if (!victim.isHuman()) {
      throw new BadRequestException("Kill already registered.");
    }

    createKillDTO.setVictimId(victim.getId());

    victim.setHuman(false);

    createKillDTO.setTime(LocalDateTime.now());

    createKillDTO.setLocation(gameService.findById(gameId).getLocation());
    game.setHumanCount(game.getHumanCount() - 1);
    gameService.update(game);
    Kill newKill = killService.add(killMapper.createKillDtoToKill(createKillDTO));
    URI location = URI.create(gameId + "/kill/" + newKill.getId());
    checkGameOver(gameId); // Game over check

    webSocketService.sendMessage("kill/" + victim.getId(), "player_died");

    webSocketService.sendMessage("kill/" + gameId, "player_died");
    return ResponseEntity.created(location).build();
  }

  private void checkGameOver(Integer gameId) {
    Game game = gameService.findById(gameId);
    if (game.getState().equals("In Progress")) {
      if (game.getHumanCount() == 1) {
        game.setState("Complete");
        gameService.update(game);
      }
    }
  }

  @Operation(summary = "Update a Kill")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "204",
            description = "Successfully updated the Kill",
            content = @Content),
        @ApiResponse(
            responseCode = "400",
            description = "Malformed request",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = BadRequestException.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Kill does not exist with supplied gameId and killId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @PutMapping("/{gameId}/kill/{killId}")
  public ResponseEntity<KillDTO> update(
      @RequestBody KillDTO killDTO,
      @PathVariable("gameId") int gameId,
      @PathVariable("killId") int killId) {

    killDTO.setId(killId);
    killService.update(killMapper.killDTOToKill(killDTO));

    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Delete a specific Kill by ID")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "204",
            description = "Kill deleted.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = KillDTO.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Kill does not exist with supplied gameId and killId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @DeleteMapping("/{gameId}/kill/{killId}")
  public ResponseEntity delete(@PathVariable("killId") int killId) {
    killService.deleteById(killId);
    return ResponseEntity.noContent().build();
  }
}
