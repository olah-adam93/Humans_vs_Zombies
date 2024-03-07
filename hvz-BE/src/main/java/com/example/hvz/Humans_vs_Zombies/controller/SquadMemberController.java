package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.mapper.SquadMemberMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadMemberDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import io.swagger.v3.oas.annotations.Operation;
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
  @GetMapping("/{gameId}/squadmember")
  public ResponseEntity<Collection<SquadMemberDTO>> findByGameId(
      @PathVariable("gameId") Integer gameId) {
    Collection<SquadMemberDTO> squadsMembers =
        squadMemberMapper.squadMemberToSquadMemberDto(squadMemberService.findAllByGameId(gameId));
    return ResponseEntity.ok(squadsMembers);
  }

  @Operation(summary = "Get a specific squad member in a game by ID")
  @GetMapping("/{gameId}/squadmember/{squadMemberId}")
  public ResponseEntity<SquadMemberDTO> findBySquadMemberId(
      @PathVariable("gameId") int gameId, @PathVariable("squadMemberId") int squadMemberId) {
    SquadMemberDTO squadMemberDTO =
        squadMemberMapper.squadMemberToSquadMemberDto(
            squadMemberService.findByGameIdAndId(gameId, squadMemberId));
    return ResponseEntity.ok(squadMemberDTO);
  }

  @Operation(summary = "Add new squad member")
  @PostMapping("{gameId}/squadmember")
  public ResponseEntity<Void> add(
      @PathVariable("gameId") Integer gameId, @RequestBody SquadMemberDTO squadMemberDTO) {
    Game game = gameService.findById(gameId);
    SquadMember squadMember =
        squadMemberService.add(squadMemberMapper.squadMemberDtoToSquadMember(squadMemberDTO));
    URI location = URI.create(gameId + "/player/" + squadMember.getId());
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Update a squad member")
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
  @DeleteMapping(path = "/{gameId}/squadmember/{squadMemberId}")
  public ResponseEntity<Void> delete(@PathVariable("squadMemberId") int squadMemberId) {
    squadMemberService.deleteById(squadMemberId);
    return ResponseEntity.noContent().build();
  }
}
