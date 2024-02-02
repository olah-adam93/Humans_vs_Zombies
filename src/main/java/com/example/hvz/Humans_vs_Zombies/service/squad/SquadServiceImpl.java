package com.example.hvz.Humans_vs_Zombies.service.squad;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.repository.SquadRepository;
import java.util.Collection;
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
    return squadRepository
        .findById(squadId)
        .orElseThrow(
            () ->
                new NotFoundException(String.format("Squad with ID: %s does not exist.", squadId)));
  }

  @Override
  public Collection<Squad> findAll() {
    return squadRepository.findAll();
  }

  @Override
  public Squad add(Squad squad) {
    squadRepository
        .findById(squad.getId())
        .ifPresent(
            existingSquad -> {
              throw new BadRequestException(
                  String.format("Squad with ID: %s already exists.", squad.getId()));
            });

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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Squad with ID: %s does not exist.", squad.getId())));
  }

  @Override
  public void deleteById(Integer squadId) {
    squadRepository
        .findById(squadId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Squad with ID: %s not found.", squadId)));

    squadRepository.deleteById(squadId);
  }

  @Override
  public void delete(Squad squad) {
    squadRepository.delete(squad);
  }

  @Override
  public Squad findByGame_IdAndId(int gameId, Integer squadId) {
    return squadRepository
        .findByGame_IdAndId(gameId, squadId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Squad with gameID: %d and ID: %d not found.", gameId, squadId)));
  }

  @Override
  public Squad findByNameAndGame_Id(String squadName, int gameId) {
    return squadRepository
        .findByNameAndGame_Id(squadName, gameId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Squad with name: %s and gameID: %d not found.", squadName, gameId)));
  }
}
