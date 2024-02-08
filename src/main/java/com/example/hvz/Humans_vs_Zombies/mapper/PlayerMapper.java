package com.example.hvz.Humans_vs_Zombies.mapper;

import com.example.hvz.Humans_vs_Zombies.model.*;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.CreatePlayerDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerAdminDTO;
import com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO.PlayerDTO;
import com.example.hvz.Humans_vs_Zombies.service.chat.ChatService;
import com.example.hvz.Humans_vs_Zombies.service.game.GameService;
import com.example.hvz.Humans_vs_Zombies.service.loginuser.LoginUserService;
import com.example.hvz.Humans_vs_Zombies.service.squadmember.SquadMemberService;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

  PlayerMapper INSTANCE = Mappers.getMapper(PlayerMapper.class);

  @Mapping(target = "loginUser", source = "loginUser.id")
  @Mapping(target = "game", source = "game.id")
  @Mapping(target = "squadMember", source = "squadMember.id")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatsToIds")
  PlayerDTO playerToPlayerDto(Player player);

  Collection<PlayerDTO> playerToPlayerDto(Collection<Player> players);

  @Mapping(target = "loginUser", source = "loginUser.id")
  @Mapping(target = "game", source = "game.id")
  @Mapping(target = "squadMember", source = "squadMember.id")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatsToIds")
  @Mapping(target = "username", source = "loginUser", qualifiedByName = "userIdToUsername")
  PlayerAdminDTO playerToPlayerAdminDto(Player player);

  Collection<PlayerAdminDTO> playerToPlayerAdminDto(Collection<Player> players);

  @Named("userIdToUsername")
  default String mapUserIdToUsername(LoginUser loginUser) {
    return Optional.ofNullable(loginUser).map(LoginUser::getUserName).orElse(null);
  }

  @Mapping(target = "loginUser", source = "loginUser", qualifiedByName = "loginUserIdToLoginUser")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(
      target = "squadMember",
      source = "squadMember",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatIdToChats")
  Player playerDtoToPlayer(PlayerDTO playerDto);

  @Mapping(target = "loginUser", source = "loginUser", qualifiedByName = "loginUserIdToLoginUser")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(
      target = "squadMember",
      source = "squadMember",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatIdToChats")
  Player createPlayerDtoToPlayer(CreatePlayerDTO createPlayerDTO);

  @Named("loginUserIdToLoginUser")
  default LoginUser mapIdToUser(Integer id, @Context LoginUserService loginUserService) {
    return Optional.ofNullable(id).map(loginUserService::findById).orElse(null);
  }

  @Named("gameIdToGame")
  default Game mapIdToGame(Integer id, @Context GameService gameService) {
    return Optional.ofNullable(id).map(gameService::findById).orElse(null);
  }

  @Named("squadMemberIdToSquadMember")
  default SquadMember mapIdToSquadMember(Integer id, SquadMemberService squadMemberService) {
    return Optional.ofNullable(id).map(squadMemberService::findById).orElse(null);
  }

  @Named("chatIdToChats")
  default Set<Chat> mapChatIdsToPlayers(Set<Integer> chatIds, ChatService chatService) {
    return Optional.ofNullable(chatIds)
        .map(ids -> ids.stream().map(chatService::findById).collect(Collectors.toSet()))
        .orElse(new HashSet<>());
  }

  @Named("chatsToIds")
  default Set<Integer> mapChatToIds(Set<Chat> source) {
    return Optional.ofNullable(source)
        .map(chats -> chats.stream().map(Chat::getId).collect(Collectors.toSet()))
        .orElse(null);
  }
}
