package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.CreateKillDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.KillDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Kill;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import java.util.Collection;
import java.util.Optional;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface KillMapper {

  KillMapper INSTANCE = Mappers.getMapper(KillMapper.class);

  @Mapping(target = "game", source = "game.id")
  KillDTO killToKillDto(Kill kill);

  Collection<KillDTO> killToKillDto(Collection<Kill> kills);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  Kill killDTOToKill(KillDTO killDTO);

  @Mapping(target = "game", source = "game.id")
  CreateKillDTO killToCreateKillDto(Kill kill);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  Kill createKillDtoToKill(CreateKillDTO createKillDTO);

  @Named("gameIdToGame")
  default Game mapIdToGame(Integer gameId, @Context GameService gameService) {
    return Optional.ofNullable(gameId).map(gameService::findById).orElse(null);
  }
}
