package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.Squad;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SquadRepository extends JpaRepository<Squad, Integer> {

  Set<Squad> findAllByGameId(int gameId);

  Optional<Squad> findByGame_IdAndId(int gameId, Integer squadId);

  Optional<Squad> findByGame_IdAndName(int gameId, String squadName);
}
