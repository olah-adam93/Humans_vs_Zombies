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

@Mapper(componentModel = "spring")
public abstract class PlayerMapper {

  protected LoginUserService loginUserService;
  protected GameService gameService;
  protected SquadMemberService squadMemberService;
  protected ChatService chatService;

  @Mapping(target = "loginUser", source = "loginUser.id")
  @Mapping(target = "game", source = "game.id")
  @Mapping(target = "squadMember", source = "squadMember.id")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatsToIds")
  public abstract PlayerDTO playerToPlayerDto(Player player);

  public abstract Collection<PlayerDTO> playerToPlayerDto(Collection<Player> players);

  @Mapping(target = "loginUser", source = "loginUser.id")
  @Mapping(target = "game", source = "game.id")
  @Mapping(target = "squadMember", source = "squadMember.id")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatsToIds")
  @Mapping(target = "username", source = "loginUser", qualifiedByName = "userIdToUsername")
  public abstract PlayerAdminDTO playerToPlayerAdminDto(Player player);

  public abstract Collection<PlayerAdminDTO> playerToPlayerAdminDto(Collection<Player> players);

  @Named("userIdToUsername")
  String mapUserIdToUsername(LoginUser loginUser) {
    return Optional.ofNullable(loginUser).map(LoginUser::getUserName).orElse(null);
  }

  @Mapping(target = "loginUser", source = "loginUser", qualifiedByName = "loginUserIdToLoginUser")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(
      target = "squadMember",
      source = "squadMember",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatIdToChats")
  public abstract Player playerDtoToPlayer(PlayerDTO playerDto);

  @Mapping(target = "loginUser", source = "loginUser", qualifiedByName = "loginUserIdToLoginUser")
  @Mapping(target = "game", source = "game", qualifiedByName = "gameIdToGame")
  @Mapping(
      target = "squadMember",
      source = "squadMember",
      qualifiedByName = "squadMemberIdToSquadMember")
  @Mapping(target = "chats", source = "chats", qualifiedByName = "chatIdToChats")
  public abstract Player createPlayerDtoToPlayer(CreatePlayerDTO createPlayerDTO);

  @Named("loginUserIdToLoginUser")
  LoginUser mapIdToUser(Integer id) {
    return Optional.ofNullable(id).map(loginUserService::findById).orElse(null);
  }

  @Named("gameIdToGame")
  Game mapIdToGame(Integer id) {
    return Optional.ofNullable(id).map(gameService::findById).orElse(null);
  }

  @Named("squadMemberIdToSquadMember")
  SquadMember mapIdToSquadMember(Integer id) {
    return Optional.ofNullable(id).map(squadMemberService::findById).orElse(null);
  }

  @Named("chatIdToChats")
  Set<Chat> mapChatIdsToPlayers(Set<Integer> chatIds) {
    return Optional.ofNullable(chatIds)
        .map(ids -> ids.stream().map(chatService::findById).collect(Collectors.toSet()))
        .orElse(new HashSet<>());
  }

  @Named("chatsToIds")
  Set<Integer> mapChatToIds(Set<Chat> source) {
    return Optional.ofNullable(source)
        .map(chats -> chats.stream().map(Chat::getId).collect(Collectors.toSet()))
        .orElse(null);
  }
}
