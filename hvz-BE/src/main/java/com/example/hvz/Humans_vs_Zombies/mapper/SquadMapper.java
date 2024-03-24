package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.CreateSquadDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class SquadMapper {

  @Autowired
  protected GameService gameService;
  @Autowired
  protected SquadMemberService squadMemberService;

  @Mapping(target = "squadMembers", source = "squadMembers", qualifiedByName = "squadMembersToIds")
  @Mapping(target = "game", source = "game.id")
  public abstract SquadDTO squadToSquadDto(Squad squad);

  public abstract Collection<SquadDTO> squadToSquadDto(Collection<Squad> squads);

  @Named("squadMembersToIds")
  Set<Integer> mapSquadMembersToIds(Set<SquadMember> source) {
    return Optional.ofNullable(source)
        .map(
            squadMembers ->
                squadMembers.stream().map(SquadMember::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  @Mapping(
      target = "squadMembers",
      source = "squadMembers",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  public abstract Squad squadDtoToSquad(SquadDTO squadDTO);

  @Mapping(
      target = "squadMembers",
      source = "squadMembers",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  public abstract Squad createSquadDtoToSquad(CreateSquadDTO createSquadDTO);

  @Named("gameIdToGame")
  Game mapIdToGame(Integer gameId) {
    return Optional.ofNullable(gameId).map(gameService::findById).orElse(null);
  }

  @Named("squadMemberIdToSquadMember")
  SquadMember mapIdToSquadMember(int squadMemberId) {
    return Optional.of(squadMemberId).map(squadMemberService::findById).orElse(null);
  }
}
