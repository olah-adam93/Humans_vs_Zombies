package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadMemberDTO;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import com.example.hvz.Humans_vs_Zombies.service.squad.SquadService;
import java.util.*;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SquadMemberMapper {

  SquadMemberMapper INSTANCE = Mappers.getMapper(SquadMemberMapper.class);

  @Mapping(target = "squad", source = "squad.id")
  @Mapping(target = "player", source = "player.id")
  SquadMemberDTO squadMemberToSquadMemberDto(SquadMember squadMember);

  Collection<SquadMemberDTO> squadMemberToSquadMemberDto(Collection<SquadMember> squadMembers);

  @Mapping(target = "squad", source = "squad", qualifiedByName = "squadIdToProject")
  @Mapping(target = "player", source = "player", qualifiedByName = "playerIdToProject")
  SquadMember squadMemberDtoToSquadMember(SquadMemberDTO squadMemberDTO);

  @Named("squadIdToProject")
  default Squad mapIdToSquad(Integer squadId, @Context SquadService squadService) {
    return Optional.ofNullable(squadId).map(squadService::findById).orElse(null);
  }

  @Named("playerIdToProject")
  default Player mapIdToPlayer(Integer playerId, @Context PlayerService playerService) {
    return Optional.ofNullable(playerId).map(playerService::findById).orElse(null);
  }
}
