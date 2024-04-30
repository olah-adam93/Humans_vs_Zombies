package com.example.hvz.Humans_vs_Zombies.service.game;

import com.example.hvz.Humans_vs_Zombies.model.Game;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import org.springframework.stereotype.Service;

@Service
public interface GameService extends CrudService<Game, Integer> {
}
