package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.*;
import com.example.hvz.Humans_vs_Zombies.model.DTO.GameDTO;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import com.example.hvz.Humans_vs_Zombies.service.kill.KillService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import com.example.hvz.Humans_vs_Zombies.service.squad.SquadService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class GameMapper {
  @Autowired
  protected ChatService chatService;
  @Autowired
  protected KillService killService;
  @Autowired
  protected PlayerService playerService;
  @Autowired
  protected SquadService squadService;

  @Mapping(target = "squads", source = "squads", qualifiedByName = "squadsToIds")
  @Mapping(target = "kills", source = "kills", qualifiedByName = "killsToIds")
  @Mapping(target = "players", source = "players", qualifiedByName = "playersToIds")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatsToIds")
  public abstract GameDTO gameToGameDto(Game game);

  @Named("squadsToIds")
  Set<Integer> mapSquadsToIds(Set<Squad> source) {
    return Optional.ofNullable(source)
        .map(squads -> squads.stream().map(Squad::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  @Named("killsToIds")
  Set<Integer> mapKillsToIds(Set<Kill> source) {
    return Optional.ofNullable(source)
        .map(kills -> kills.stream().map(Kill::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  @Named("playersToIds")
  Set<Integer> mapPlayersToIds(Set<Player> source) {
    return Optional.ofNullable(source)
        .map(players -> players.stream().map(Player::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  @Named("chatsToIds")
  Set<Integer> mapChatToIds(Set<Chat> source) {
    return Optional.ofNullable(source)
        .map(chats -> chats.stream().map(Chat::getId).collect(Collectors.toSet()))
        .orElse(null);
  }

  public abstract Collection<GameDTO> gameToGameDto(Collection<Game> games);

  @Mapping(target = "squads", source = "squads", qualifiedByName = "squadIdToSquads")
  @Mapping(target = "kills", source = "kills", qualifiedByName = "killIdToKills")
  @Mapping(target = "players", source = "players", qualifiedByName = "playerIdToPlayers")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatIdToChats")
  public abstract Game gameDtoToGame(GameDTO dto);

  @Named("squadIdToSquads")
  Set<Squad> mapIdsToSquads(Set<Integer> squadIds) {
    return Optional.ofNullable(squadIds)
        .map(ids -> ids.stream().map(squadService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }

  @Named("killIdToKills")
  Set<Kill> mapIdsToKills(Set<Integer> killIds) {
    return Optional.ofNullable(killIds)
        .map(ids -> ids.stream().map(killService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }

  @Named("playerIdToPlayers")
  Set<Player> mapIdsToPlayers(Set<Integer> playerIds) {
    return Optional.ofNullable(playerIds)
        .map(ids -> ids.stream().map(playerService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }

  @Named("chatIdToChats")
  Set<Chat> mapChatIdsToPlayers(Set<Integer> chatIds) {
    return Optional.ofNullable(chatIds)
        .map(ids -> ids.stream().map(chatService::findById).collect(Collectors.toSet()))
        .orElse(Collections.emptySet());
  }
}
