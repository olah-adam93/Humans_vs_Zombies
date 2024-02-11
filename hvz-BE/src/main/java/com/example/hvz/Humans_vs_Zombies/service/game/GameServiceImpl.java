package com.example.hvz.Humans_vs_Zombies.service.game;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.repository.GameRepository;
import java.util.Collection;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

  private final GameRepository gameRepository;

  public GameServiceImpl(GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  @Override
  public Game findById(Integer gameId) {

    return gameRepository
        .findById(gameId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Game with ID: %s does not exist.", gameId)));
  }

  @Override
  public Collection<Game> findAll() {
    return gameRepository.findAll();
  }

  @Override
  public Game add(Game game) {
    gameRepository
        .findById(game.getId())
        .ifPresent(
            existingGame -> {
              throw new BadRequestException(
                  String.format("Game with ID: %s already exists.", game.getId()));
            });

    return gameRepository.save(game);
  }

  @Override
  public Game update(Game game) {
    return gameRepository
        .findById(game.getId())
        .map(
            existingGame -> {
              gameRepository.save(game);
              return game;
            })
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Game with ID: %s does not exist.", game.getId())));
  }

  @Override
  public void deleteById(Integer gameId) {
    gameRepository
        .findById(gameId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Game with ID: %s not found.", gameId)));

    gameRepository.deleteById(gameId);
  }

  @Override
  public void delete(Game game) {
    gameRepository.delete(game);
  }
}
