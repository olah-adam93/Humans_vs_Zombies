package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.model.DTO.ChatDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import java.util.*;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ChatMapper {

  @Autowired
  protected PlayerService playerService;
  @Autowired
  protected GameService gameService;

  @Mapping(target = "game", source = "game.id")
  @Mapping(target = "player", source = "player.id")
  public abstract ChatDTO chatToChatDto(Chat chat);

  public abstract Collection<ChatDTO> chatToChatDto(Collection<Chat> chats);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(target = "player", source = "player", qualifiedByName = "playerIdToPlayer")
  public abstract Chat chatDtoToChat(ChatDTO chatDTO);

  @Named("gameIdToGame")
  Game mapIdToGame(Integer gameId) {
    return Optional.ofNullable(gameId).map(gameService::findById).orElse(null);
  }

  @Named("playerIdToPlayer")
  Player mapIdToPlayer(Integer playerId) {
    return Optional.ofNullable(playerId).map(playerService::findById).orElse(null);
  }
}
