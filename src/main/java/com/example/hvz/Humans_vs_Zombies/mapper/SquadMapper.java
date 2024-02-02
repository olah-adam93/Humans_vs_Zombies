package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.CreateSquadDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO.SquadDTO;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SquadMapper {

  SquadMapper INSTANCE = Mappers.getMapper(SquadMapper.class);

  @Mapping(target = "squadMembers", source = "squadMembers", qualifiedByName = "squadMembersToIds")
  @Mapping(target = "game.id", source = "game")
  SquadDTO squadToSquadDto(Squad squad);

  Collection<SquadDTO> squadToSquadDto(Collection<Squad> squads);

  @Named("squadMembersToIds")
  default Set<Integer> mapSquadMembersToIds(Set<SquadMember> source) {
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
  @Mapping(target = "game", source = "game")
  Squad squadDtoToSquad(SquadDTO squadDTO);

  @Mapping(
      target = "squadMembers",
      source = "squadMembers",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "game", source = "game")
  Squad createSquadDtoToSquad(CreateSquadDTO createSquadDTO);

  @Named("squadMemberIdToSquadMember")
  default SquadMember mapIdToSquadMember(
      int squadMemberId, @Context SquadMemberService squadMemberService) {
    return Optional.of(squadMemberId).map(squadMemberService::findById).orElse(null);
  }
}
