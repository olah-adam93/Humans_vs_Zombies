package com.example.hvz.Humans_vs_Zombies.service.player;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Player with ID: %s does not exist.", playerId)));
  }

  @Override
  public Collection<Player> findAll() {
    return playerRepository.findAll();
  }

  @Override
  public Player add(Player player) {
    playerRepository
        .findById(player.getId())
        .ifPresent(
            existingPlayer -> {
              throw new BadRequestException(
                  String.format("Player with ID: %s already exists.", player.getId()));
            });

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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Player with ID: %s does not exist.", player.getId())));
  }

  @Override
  public void deleteById(Integer playerId) {
    playerRepository
        .findById(playerId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Player with ID: %s not found.", playerId)));

    playerRepository.deleteById(playerId);
  }

  @Override
  public void delete(Player player) {
    playerRepository.delete(player);
  }

  @Override
  public Player findByGameIdAndId(int gameId, int playerId) {
    return playerRepository
        .findByGameIdAndId(gameId, playerId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Player with ID: %s and gameID: %s not found.", playerId, gameId)));
  }

  @Override
  public Player findPlayerByGameIdAndLoginUser_Id(int gameId, int loginUserId) {
    return playerRepository
        .findPlayerByGameIdAndLoginUser_Id(gameId, loginUserId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Player with gameID: %d and loginUserID: %d not found.",
                        gameId, loginUserId)));
  }

  @Override
  public Collection<Player> findAllByLoginUser_Id(int loginUserId) {
    Collection<Player> players = playerRepository.findAllByLoginUser_Id(loginUserId);
    if (players.isEmpty()) {
      throw new NotFoundException(
          String.format("No players found for loginUserID: %d", loginUserId));
    }
    return players;
  }

  @Override
  public Collection<Player> findAllByLoginUser_KeycloakId(String keycloakId) {
    Collection<Player> players = playerRepository.findAllByLoginUser_KeycloakId(keycloakId);
    if (players.isEmpty()) {
      throw new NotFoundException(
          String.format("No players found for loginUser and KeycloakID: %s", keycloakId));
    }
    return players;
  }

  @Override
  public Player findByGameIdAndBiteCode(int gameId, String biteCode) {
    return playerRepository
        .findByGameIdAndBiteCode(gameId, biteCode)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Player with gameID: %d and biteCode: %s not found.", gameId, biteCode)));
  }

  @Override
  public Player findByBiteCode(String biteCode) {
    return playerRepository
        .findByBiteCode(biteCode)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Player with biteCode: %s not found.", biteCode)));
  }
}
