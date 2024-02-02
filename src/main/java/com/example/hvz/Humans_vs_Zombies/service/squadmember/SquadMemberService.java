package com.example.hvz.Humans_vs_Zombies.service.squadmember;

import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import java.util.Collection;
import org.springframework.stereotype.Service;

@Service
public interface SquadMemberService extends CrudService<SquadMember, Integer> {

  Collection<SquadMember> findAllBySquad_Id(int squadId);

  Collection<SquadMember> findAllByRankContaining(String name);

  SquadMember findByPlayer_Id(int playerId);

  SquadMember findByGameIdAndId(int gameId, int squadMemberId);
}
