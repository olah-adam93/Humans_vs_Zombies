package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.model.DTO.ChatDTO;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.player.PlayerService;
import java.util.*;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ChatMapper {

  ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);

  ChatDTO chatToChatDto(Chat chat);

  Collection<ChatDTO> chatToChatDto(Collection<Chat> chats);

  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(target = "player", source = "player", qualifiedByName = "playerIdToPlayer")
  Chat chatDtoToChat(ChatDTO chatDTO);

  @Named("gameIdToGame")
  default Game mapIdToGame(Integer gameId, @Context GameService gameService) {
    return Optional.ofNullable(gameId).map(gameService::findById).orElse(null);
  }

  @Named("playerIdToPlayer")
  default Player mapIdToPlayer(Integer playerId, @Context PlayerService playerService) {
    return Optional.ofNullable(playerId).map(playerService::findById).orElse(null);
  }
}
