package com.example.hvz.Humans_vs_Zombies.service.squad;

import com.example.hvz.Humans_vs_Zombies.exception.SquadNotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.repository.SquadRepository;
import java.util.Collection;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SquadServiceImpl implements SquadService {

  private final SquadRepository squadRepository;

  @Autowired
  public SquadServiceImpl(SquadRepository squadRepository) {
    this.squadRepository = squadRepository;
  }

  @Override
  public Squad findById(Integer squadId) {
    return squadRepository.findById(squadId).orElseThrow(() -> new SquadNotFoundException(squadId));
  }

  @Override
  public Collection<Squad> findAll() {
    return squadRepository.findAll();
  }

  @Override
  public Squad add(Squad squad) {
    return squadRepository.save(squad);
  }

  @Override
  public Squad update(Squad squad) {
    return squadRepository
        .findById(squad.getId())
        .map(
            existingSquad -> {
              squadRepository.save(squad);
              return squad;
            })
        .orElseThrow(() -> new SquadNotFoundException(squad.getId()));
  }

  @Override
  public void deleteById(Integer squadId) {
    squadRepository.findById(squadId).orElseThrow(() -> new SquadNotFoundException(squadId));
    squadRepository.deleteById(squadId);
  }

  @Override
  public void delete(Squad squad) {
    squadRepository.delete(squad);
  }

  @Override
  public Set<Squad> findAllByGameId(int gameId) {
    return squadRepository.findAllByGameId(gameId);
  }

  @Override
  public Squad findByGame_IdAndId(int gameId, int squadId) {
    return squadRepository
        .findByGame_IdAndId(gameId, squadId)
        .orElseThrow(() -> new SquadNotFoundException(gameId, squadId));
  }

  @Override
  public Squad findBydGame_IdAndName(int gameId, String squadName) {
    return squadRepository
        .findByGame_IdAndName(gameId, squadName)
        .orElseThrow(() -> new SquadNotFoundException(gameId, squadName));
  }
}
