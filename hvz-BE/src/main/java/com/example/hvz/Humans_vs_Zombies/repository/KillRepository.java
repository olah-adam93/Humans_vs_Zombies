package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.Kill;
import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KillRepository extends JpaRepository<Kill, Integer> {

  Collection<Kill> findAllByGameId(int gameId);

  Optional<Kill> findByGameIdAndId(int gameId, int killId);
}
