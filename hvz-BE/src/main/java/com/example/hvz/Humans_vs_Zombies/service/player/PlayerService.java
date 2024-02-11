package com.example.hvz.Humans_vs_Zombies.service.player;

import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public interface PlayerService extends CrudService<Player, Integer> {

  Collection<Player> findAllByGameId(int gameId);

  Player findByGameIdAndId(int gameId, int playerId);

  Player findPlayerByGameIdAndLoginUser_Id(int gameId, int loginUserId);

  Collection<Player> findAllByLoginUser_Id(int loginUserId);

  Collection<Player> findAllByLoginUser_KeycloakId(String keycloakId);

  Player findByGameIdAndBiteCode(int gameId, String biteCode);
  String createRandomBiteCode(int length);

  Player findByBiteCode(String biteCode);
}
