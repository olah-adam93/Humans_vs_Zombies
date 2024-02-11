package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.CreateKillDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO.KillDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Kill;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import java.util.Collection;
import java.util.Optional;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class KillMapper {

  protected GameService gameService;

  @Mapping(target = "game", source = "game.id")
  public abstract KillDTO killToKillDto(Kill kill);

  public abstract Collection<KillDTO> killToKillDto(Collection<Kill> kills);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  public abstract Kill killDTOToKill(KillDTO killDTO);

  @Mapping(target = "game", source = "game.id")
  public abstract CreateKillDTO killToCreateKillDto(Kill kill);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  public abstract Kill createKillDtoToKill(CreateKillDTO createKillDTO);

  @Named("gameIdToGame")
  Game gameIdToGame(Integer gameId) {
    return Optional.ofNullable(gameId).map(gameService::findById).orElse(null);
  }
}
