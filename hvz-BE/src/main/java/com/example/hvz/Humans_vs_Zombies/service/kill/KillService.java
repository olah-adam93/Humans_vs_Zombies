package com.example.hvz.Humans_vs_Zombies.service.kill;

import com.example.hvz.Humans_vs_Zombies.model.Kill;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import java.util.Collection;
import org.springframework.stereotype.Service;

@Service
public interface KillService extends CrudService<Kill, Integer> {

  Collection<Kill> findAllByGameId(int gameId);

  Kill findByGameIdAndKillId(int gameId, int killId);
}
