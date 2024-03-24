package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.LoginUserDTO;
import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class LoginUserMapper {

  @Autowired
  protected PlayerService playerService;

  @Mapping(target = "players", source = "players", qualifiedByName = "playersToIds")
  public abstract LoginUserDTO loginUserToLoginUserDto(LoginUser loginUser);

  @Named("playersToIds")
  Set<Integer> mapPlayersToIds(Set<Player> source) {
    return Optional.ofNullable(source)
        .map(players -> players.stream().map(Player::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  public abstract Collection<LoginUserDTO> loginUserToLoginUserDto(Collection<LoginUser> loginUser);

  @Mapping(target = "players", source = "players", qualifiedByName = "playersIdToPlayers")
  public abstract LoginUser loginUserDtoToLoginUser(LoginUserDTO loginUserDTO);

  @Named("playersIdToPlayers")
  Set<Player> mapIdToPlayer(Set<Integer> playerIds) {
    return Optional.ofNullable(playerIds)
        .map(ids -> ids.stream().map(playerService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }
}
