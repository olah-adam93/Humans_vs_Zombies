package com.example.hvz.Humans_vs_Zombies.service.player;

import com.example.hvz.Humans_vs_Zombies.exception.*;
import com.example.hvz.Humans_vs_Zombies.model.Player;
import com.example.hvz.Humans_vs_Zombies.repository.PlayerRepository;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerServiceImpl implements PlayerService {

  private final PlayerRepository playerRepository;

  @Autowired
  public PlayerServiceImpl(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
  }

  @Override
  public Player findById(Integer playerId) {
    return playerRepository
        .findById(playerId)
        .orElseThrow(() -> new PlayerNotFoundException(playerId));
  }

  @Override
  public Collection<Player> findAll() {
    return playerRepository.findAll();
  }

  @Override
  public Player add(Player player) {

    return playerRepository.save(player);
  }

  @Override
  public Player update(Player player) {
    return playerRepository
        .findById(player.getId())
        .map(
            existingPlayer -> {
              playerRepository.save(player);
              return player;
            })
        .orElseThrow(() -> new PlayerNotFoundException(player.getId()));
  }

  @Override
  public void deleteById(Integer playerId) {
    playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException(playerId));
    playerRepository.deleteById(playerId);
  }

  @Override
  public void delete(Player player) {
    playerRepository.delete(player);
  }

  @Override
  public Collection<Player> findAllByGameId(int gameId) {
    return playerRepository.findAllByGameId(gameId);
  }

  @Override
  public Player findByGameIdAndId(int gameId, int playerId) {
    return playerRepository
        .findByGameIdAndId(gameId, playerId)
        .orElseThrow(() -> new PlayerNotFoundException(playerId, gameId));
  }

  @Override
  public Player findPlayerByGameIdAndLoginUser_Id(int gameId, int loginUserId) {
    return playerRepository
        .findPlayerByGameIdAndLoginUser_Id(gameId, loginUserId)
        .orElseThrow(() -> new LoginUserNotFoundException(gameId, loginUserId));
  }

  @Override
  public Collection<Player> findAllByLoginUser_Id(int loginUserId) {
    Collection<Player> players = playerRepository.findAllByLoginUser_Id(loginUserId);
    if (players.isEmpty()) {
      throw new LoginUserNotFoundException(loginUserId);
    }
    return players;
  }

  @Override
  public Collection<Player> findAllByLoginUser_KeycloakId(String keycloakId) {
    Collection<Player> players = playerRepository.findAllByLoginUser_KeycloakId(keycloakId);
    if (players.isEmpty()) {
      throw new LoginUserNotFoundException(keycloakId);
    }
    return players;
  }

  @Override
  public Player findByGameIdAndBiteCode(int gameId, String biteCode) {
    return playerRepository
        .findByGameIdAndBiteCode(gameId, biteCode)
        .orElseThrow(() -> new PlayerWithBiteCodeNotFoundException(gameId, biteCode));
  }

  public String createRandomBiteCode() {
    StringBuilder code;
    do {
      code = new StringBuilder();
      for (int i = 0; i < 4; i++) {
        int randomBit = (int) (Math.random() * 2);
        code.append(randomBit);
      }
    } while (playerRepository.findByBiteCode(code.toString()).isPresent());

    return code.toString();
  }

  @Override
  public Player findByBiteCode(String biteCode) {
    return playerRepository
        .findByBiteCode(biteCode)
        .orElseThrow(() -> new PlayerWithBiteCodeNotFoundException(biteCode));
  }
}
