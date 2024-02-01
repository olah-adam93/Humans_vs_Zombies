package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SquadMemberRepository extends JpaRepository<SquadMember, Integer> {
  Collection<SquadMember> findAllBySquad_Id(int squadId);

  Collection<SquadMember> findAllByRankContaining(String name);

  Optional<SquadMember> findByPlayer_Id(int playerId);

  @Query(
      "SELECT s FROM SquadMember s JOIN s.squad sq WHERE sq.game.id = :gameId AND s.id = :squadMemberId")
  Optional<SquadMember> findByGameIdAndId(int gameId, int squadMemberId);
}
