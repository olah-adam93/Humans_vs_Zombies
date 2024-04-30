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

  @Override
  public Collection<String> findAllBiteCodesByGameId(int gameId){
    return playerRepository.findAllBiteCodesByGameId(gameId);
  }

  @Override
  public String generateUniqueBiteCode(int gameId) {
    Collection<String> existingBiteCodes = findAllBiteCodesByGameId(gameId);
    StringBuilder code;
    boolean isUniqueCode;
    do {
      code = new StringBuilder();
      for (int i = 0; i < 4; i++) {
        int randomBit = (int) (Math.random() * 2);
        code.append(randomBit);
      }
      isUniqueCode = !existingBiteCodes.contains(code.toString());
    } while (!isUniqueCode);

    return code.toString();
  }
}
