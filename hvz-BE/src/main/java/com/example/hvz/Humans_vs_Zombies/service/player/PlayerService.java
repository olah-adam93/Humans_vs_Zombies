package com.example.hvz.Humans_vs_Zombies.service.player;

import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import java.util.Collection;
import org.springframework.stereotype.Service;

@Service
public interface PlayerService extends CrudService<Player, Integer> {

  Collection<Player> findAllByGameId(int gameId);

  Player findByGameIdAndId(int gameId, int playerId);

  Collection<Player> findAllByLoginUser_KeycloakId(String keycloakId);

  Player findByGameIdAndBiteCode(int gameId, String biteCode);

  Collection<String> findAllBiteCodesByGameId(int gameId);

  String generateUniqueBiteCode(int gameId);
}
