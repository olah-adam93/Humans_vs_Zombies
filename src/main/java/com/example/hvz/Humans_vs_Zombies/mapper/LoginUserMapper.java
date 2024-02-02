package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.LoginUserDTO;
import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LoginUserMapper {

  LoginUserMapper INSTANCE = Mappers.getMapper(LoginUserMapper.class);

  @Mapping(target = "players", source = "players", qualifiedByName = "playersToIds")
  LoginUserDTO loginUserToLoginUserDto(LoginUser loginUser);

  @Named("playersToIds")
  default Set<Integer> mapPlayersToIds(Set<Player> source) {
    return Optional.ofNullable(source)
        .map(players -> players.stream().map(Player::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  Collection<LoginUserDTO> loginUserToLoginUserDto(Collection<LoginUser> loginUser);

  @Mapping(target = "players", source = "players", qualifiedByName = "playersIdToPlayers")
  LoginUser loginUserDtoToLoginUser(LoginUserDTO loginUserDTO);

  @Named("playersIdToPlayers")
  default Set<Player> mapIdToPlayer(Set<Integer> playerIds, @Context PlayerService playerService) {
    return Optional.ofNullable(playerIds)
        .map(ids -> ids.stream().map(playerService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }
}
