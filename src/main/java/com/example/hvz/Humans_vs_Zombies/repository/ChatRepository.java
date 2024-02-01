package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.Chat;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

  Collection<Chat> findAllByGameId(int gameId);

  Collection<Chat> findAllByGameIdAndFaction(int gameId, String faction);
}
