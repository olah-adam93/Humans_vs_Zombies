package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
import com.example.hvz.Humans_vs_Zombies.mapper.SquadMemberMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadMemberDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
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
public class SquadMemberController {

  private final SquadMemberService squadMemberService;
  private final SquadMemberMapper squadMemberMapper;
  private final GameService gameService;

  public SquadMemberController(
      SquadMemberService squadMemberService,
      SquadMemberMapper squadMemberMapper,
      GameService gameService) {
    this.squadMemberService = squadMemberService;
    this.squadMemberMapper = squadMemberMapper;
    this.gameService = gameService;
  }

  @Operation(summary = "Get all squads members in a game")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success.",
            content = {
              @Content(
                  mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = SquadMemberDTO.class)))
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
  @GetMapping("/{gameId}/squadmember")
  public ResponseEntity findByGameId(@PathVariable("gameId") Integer gameId) {
    Collection<SquadMemberDTO> squadsMembers =
        squadMemberMapper.squadMemberToSquadMemberDto(squadMemberService.findAllByGameId(gameId));
    return ResponseEntity.ok(squadsMembers);
  }

  @Operation(summary = "Get a specific squad member by ID in a game")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = PlayerDTO.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Squad member does not exist with supplied gameId and squadMemberId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @GetMapping("/{gameId}/squadmember/{squadMemberId}")
  public ResponseEntity<SquadMemberDTO> findBySquadMemberId(
      @PathVariable("gameId") int gameId, @PathVariable("squadMemberId") int squadMemberId) {
    SquadMemberDTO squadMemberDTO =
        squadMemberMapper.squadMemberToSquadMemberDto(
            squadMemberService.findByGameIdAndId(gameId, squadMemberId));
    return ResponseEntity.ok(squadMemberDTO);
  }

  @Operation(summary = "Add a new SquadMember")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "The SquadMember is successfully added",
            content = @Content),
        @ApiResponse(
            responseCode = "400",
            description = "Malformed request.",
            content = {
              @Content(
                  mediaType = "application/json",
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
  @PostMapping("{gameId}/squadmember")
  public ResponseEntity add(
      @PathVariable("gameId") Integer gameId, @RequestBody SquadMemberDTO squadMemberDTO) {
    Game game = gameService.findById(gameId);
    SquadMember squadMember =
        squadMemberService.add(squadMemberMapper.squadMemberDtoToSquadMember(squadMemberDTO));
    URI location = URI.create(gameId + "/player/" + squadMember.getId());
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Update a Squad member")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "204",
            description = "Successfully updated the Squad member",
            content = @Content),
        @ApiResponse(
            responseCode = "404",
            description = "Squad member does not exist with supplied gameId and squadMemberId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @PutMapping("/{gameId}/squadmember/{squadMemberId}")
  public ResponseEntity<SquadMemberDTO> update(
      @RequestBody SquadMemberDTO squadMemberDTO,
      @PathVariable("gameId") int gameId,
      @PathVariable("squadMemberId") int squadMemberId) {
    squadMemberDTO.setId(squadMemberId);
    SquadMember oldSquadMember =
        squadMemberService.findByGameIdAndId(gameId, squadMemberDTO.getId());
    if (squadMemberDTO.getSquad() == null) {
      squadMemberDTO.setSquad(oldSquadMember.getSquad().getId());
    }
    if (squadMemberDTO.getPlayer() == null) {
      squadMemberDTO.setPlayer(oldSquadMember.getPlayer().getId());
    }
    squadMemberService.update(squadMemberMapper.squadMemberDtoToSquadMember(squadMemberDTO));
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Delete a specific squad member by ID")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "204",
            description = "Squad member deleted.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = PlayerDTO.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "Squad member does not exist with supplied gameId and playerId.",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = NotFoundException.class))
            })
      })
  @DeleteMapping(path = "/{gameId}/squadmember/{squadMemberId}")
  public ResponseEntity delete(@PathVariable("squadMemberId") int squadMemberId) {
    squadMemberService.deleteById(squadMemberId);
    return ResponseEntity.noContent().build();
  }
}
