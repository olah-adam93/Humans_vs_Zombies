package com.example.hvz.Humans_vs_Zombies.service.squad;

import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface SquadService extends CrudService<Squad, Integer> {

  Set<Squad> findAllByGameId(int gameId);

  Squad findByGame_IdAndId(int gameId, int squadId);

  Squad findBydGame_IdAndName(int gameId, String squadName);
}
