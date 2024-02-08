package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.Game;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
}
