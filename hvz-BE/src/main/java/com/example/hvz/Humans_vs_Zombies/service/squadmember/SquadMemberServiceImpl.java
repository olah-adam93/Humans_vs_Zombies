package com.example.hvz.Humans_vs_Zombies.service.squadmember;

import com.example.hvz.Humans_vs_Zombies.exception.PlayerNotFoundException;
import com.example.hvz.Humans_vs_Zombies.exception.SquadMemberNotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.SquadMember;
import com.example.hvz.Humans_vs_Zombies.repository.SquadMemberRepository;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SquadMemberServiceImpl implements SquadMemberService {

  private final SquadMemberRepository squadMemberRepository;

  @Autowired
  public SquadMemberServiceImpl(SquadMemberRepository squadMemberRepository) {
    this.squadMemberRepository = squadMemberRepository;
  }

  @Override
  public SquadMember findById(Integer squadMemberId) {
    return squadMemberRepository
        .findById(squadMemberId)
        .orElseThrow(() -> new SquadMemberNotFoundException(squadMemberId));
  }

  @Override
  public Collection<SquadMember> findAll() {
    return squadMemberRepository.findAll();
  }

  @Override
  public SquadMember add(SquadMember squadMember) {

    return squadMemberRepository.save(squadMember);
  }

  @Override
  public SquadMember update(SquadMember squadMember) {
    return squadMemberRepository
        .findById(squadMember.getId())
        .map(
            existingSquadMember -> {
              squadMemberRepository.save(squadMember);
              return squadMember;
            })
        .orElseThrow(() -> new SquadMemberNotFoundException(squadMember.getId()));
  }

  @Override
  public void deleteById(Integer squadMemberId) {
    squadMemberRepository
        .findById(squadMemberId)
        .orElseThrow(() -> new SquadMemberNotFoundException(squadMemberId));

    squadMemberRepository.deleteById(squadMemberId);
  }

  @Override
  public void delete(SquadMember squadMember) {
    squadMemberRepository.delete(squadMember);
  }

  @Override
  public Collection<SquadMember> findAllBySquad_Id(int squadId) {
    return squadMemberRepository.findAllBySquad_Id(squadId);
  }

  @Override
  public Collection<SquadMember> findAllByRankContaining(String rank) {
    return squadMemberRepository.findAllByRankContaining(rank);
  }

  @Override
  public SquadMember findByPlayer_Id(int playerId) {
    return squadMemberRepository
        .findByPlayer_Id(playerId)
        .orElseThrow(() -> new PlayerNotFoundException(playerId));
  }

  @Override
  public Collection<SquadMember> findAllByGameId(int gameId) {
    return squadMemberRepository.findAllBySquad_Game_Id(gameId);
  }

  @Override
  public SquadMember findByGameIdAndId(int gameId, int squadMemberId) {
    return squadMemberRepository
        .findByGameIdAndId(gameId, squadMemberId)
        .orElseThrow(() -> new SquadMemberNotFoundException(gameId, squadMemberId));
  }
}
