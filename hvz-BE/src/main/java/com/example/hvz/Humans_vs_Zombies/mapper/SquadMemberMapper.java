package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadMemberDTO;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import com.example.hvz.Humans_vs_Zombies.service.squad.SquadService;
import java.util.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public abstract class SquadMemberMapper {

  protected SquadService squadService;
  protected PlayerService playerService;

  @Mapping(target = "squad", source = "squad.id")
  @Mapping(target = "player", source = "player.id")
  public abstract SquadMemberDTO squadMemberToSquadMemberDto(SquadMember squadMember);

  public abstract Collection<SquadMemberDTO> squadMemberToSquadMemberDto(
      Collection<SquadMember> squadMembers);

  @Mapping(target = "squad", source = "squad", qualifiedByName = "squadIdToProject")
  @Mapping(target = "player", source = "player", qualifiedByName = "playerIdToProject")
  public abstract SquadMember squadMemberDtoToSquadMember(SquadMemberDTO squadMemberDTO);

  @Named("squadIdToProject")
  Squad mapIdToSquad(Integer squadId) {
    return Optional.ofNullable(squadId).map(squadService::findById).orElse(null);
  }

  @Named("playerIdToProject")
  Player mapIdToPlayer(Integer playerId) {
    return Optional.ofNullable(playerId).map(playerService::findById).orElse(null);
  }
}
