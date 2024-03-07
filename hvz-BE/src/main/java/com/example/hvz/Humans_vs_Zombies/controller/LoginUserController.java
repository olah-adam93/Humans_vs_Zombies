package com.example.hvz.Humans_vs_Zombies.controller;

import com.example.hvz.Humans_vs_Zombies.mapper.LoginUserMapper;
import com.example.hvz.Humans_vs_Zombies.mapper.PlayerMapper;
import com.example.hvz.Humans_vs_Zombies.model.DTO.LoginUserDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerDTO;
import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import com.example.hvz.Humans_vs_Zombies.service.loginuser.LoginUserService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import java.net.URI;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping(path = "api/game")
public class LoginUserController {

  private final LoginUserService loginUserService;
  private final LoginUserMapper loginUserMapper;
  private final PlayerService playerService;
  private final PlayerMapper playerMapper;

  public LoginUserController(
      LoginUserService loginUserService,
      LoginUserMapper loginUserMapper,
      PlayerService playerService,
      PlayerMapper playerMapper) {
    this.loginUserService = loginUserService;
    this.loginUserMapper = loginUserMapper;
    this.playerService = playerService;
    this.playerMapper = playerMapper;
  }

  @Operation(summary = "Get all users")
  @GetMapping("/loginuser")
  public ResponseEntity<Collection<LoginUserDTO>> getAll() {
    Collection<LoginUserDTO> loginUserDTOs =
        loginUserMapper.loginUserToLoginUserDto(loginUserService.findAll());
    return ResponseEntity.ok(loginUserDTOs);
  }

  @Operation(summary = "Get all players of user")
  @GetMapping("/loginuser/{keycloakId}/player")
  public ResponseEntity<Collection<PlayerDTO>> getPlayersByKeycloakId(
      @PathVariable("keycloakId") String keycloakId) {
    Collection<PlayerDTO> players =
        playerMapper.playerToPlayerDto(playerService.findAllByLoginUser_KeycloakId(keycloakId));
    return ResponseEntity.ok(players);
  }

  @Operation(summary = "Add new user")
  @PostMapping("/loginuser")
  public ResponseEntity<Void> add(@RequestBody LoginUserDTO loginUserDTO) {
    LoginUser loginUser =
        loginUserService.add(loginUserMapper.loginUserDtoToLoginUser(loginUserDTO));
    URI location = URI.create("/loginuser" + loginUser.getId());
    return ResponseEntity.created(location).build();
  }
}
