package com.example.hvz.Humans_vs_Zombies.service.squad;

import com.example.hvz.Humans_vs_Zombies.model.Squad;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import org.springframework.stereotype.Service;

@Service
public interface SquadService extends CrudService<Squad, Integer> {

  Squad findByGame_IdAndId(int gameId, Integer squadId);

  Squad findByNameAndGame_Id(String squadName, int gameId);
}
