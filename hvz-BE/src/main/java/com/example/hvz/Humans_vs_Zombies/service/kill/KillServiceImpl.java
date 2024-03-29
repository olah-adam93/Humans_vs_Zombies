package com.example.hvz.Humans_vs_Zombies.service.kill;

import com.example.hvz.Humans_vs_Zombies.exception.KillNotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.Kill;
import com.example.hvz.Humans_vs_Zombies.repository.KillRepository;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KillServiceImpl implements KillService {

  private final KillRepository killRepository;

  @Autowired
  public KillServiceImpl(KillRepository killRepository) {
    this.killRepository = killRepository;
  }

  @Override
  public Kill findById(Integer killId) {
    return killRepository.findById(killId).orElseThrow(() -> new KillNotFoundException(killId));
  }

  @Override
  public Collection<Kill> findAll() {
    return killRepository.findAll();
  }

  @Override
  public Kill add(Kill kill) {
    return killRepository.save(kill);
  }

  @Override
  public Kill update(Kill kill) {
    return killRepository
        .findById(kill.getId())
        .map(
            existingKill -> {
              killRepository.save(kill);
              return kill;
            })
        .orElseThrow(() -> new KillNotFoundException(kill.getId()));
  }

  @Override
  public void deleteById(Integer killId) {
    killRepository.findById(killId).orElseThrow(() -> new KillNotFoundException(killId));
    killRepository.deleteById(killId);
  }

  @Override
  public void delete(Kill kill) {
    killRepository.delete(kill);
  }

  @Override
  public Collection<Kill> findAllByGameId(int gameId) {
    return killRepository.findAllByGameId(gameId);
  }

  @Override
  public Kill findByGameIdAndKillId(int gameId, int killId) {
    return killRepository
        .findByGameIdAndId(gameId, killId)
        .orElseThrow(() -> new KillNotFoundException(killId, gameId));
  }
}
