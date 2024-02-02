package com.example.hvz.Humans_vs_Zombies.service.chat;

import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import java.util.Collection;

public interface ChatService extends CrudService<Chat, Integer> {

  Collection<Chat> findAllByGameIdAndFaction(int gameId, String faction);
}
