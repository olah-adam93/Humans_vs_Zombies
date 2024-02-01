package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.Player;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

  Optional<Player> findByGameIdAndId(int gameId, int playerId);

  Optional<Player> findPlayerByGameIdAndLoginUser_Id(int gameId, int loginUserId);

  Collection<Player> findAllByLoginUser_Id(int loginUserId);

  Collection<Player> findAllByLoginUser_KeycloakId(String keycloakId);

  Optional<Player> findByGameIdAndBiteCode(int gameId, String biteCode);

  Player findByBiteCode(String biteCode);
}
