package com.example.hvz.Humans_vs_Zombies.service.squadmember;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Squad member with ID: %d not found.", squadMemberId)));
  }

  @Override
  public Collection<SquadMember> findAll() {
    return squadMemberRepository.findAll();
  }

  @Override
  public SquadMember add(SquadMember squadMember) {
    squadMemberRepository
        .findById(squadMember.getId())
        .ifPresent(
            existingSquadMember -> {
              throw new BadRequestException(
                  String.format("Squad member with ID: %s already exists.", squadMember.getId()));
            });

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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Squad member with ID: %s does not exist.", squadMember.getId())));
  }

  @Override
  public void deleteById(Integer squadMemberId) {
    squadMemberRepository
        .findById(squadMemberId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Squad member with ID: %s not found.", squadMemberId)));

    squadMemberRepository.deleteById(squadMemberId);
  }

  @Override
  public void delete(SquadMember squadMember) {
    squadMemberRepository.delete(squadMember);
  }

  @Override
  public Collection<SquadMember> findAllBySquad_Id(int squadId) {
    Collection<SquadMember> squadMembers = squadMemberRepository.findAllBySquad_Id(squadId);
    if (squadMembers.isEmpty()) {
      throw new NotFoundException(
          String.format("No squad members found for squadID: %d", squadId));
    }
    return squadMembers;
  }

  @Override
  public Collection<SquadMember> findAllByRankContaining(String rank) {
    Collection<SquadMember> squadMembers = squadMemberRepository.findAllByRankContaining(rank);
    if (squadMembers.isEmpty()) {
      throw new NotFoundException(String.format("No squad members found with rank: %s", rank));
    }
    return squadMembers;
  }

  @Override
  public SquadMember findByPlayer_Id(int playerId) {
    return squadMemberRepository
        .findByPlayer_Id(playerId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Squad member with playerID: %d not found.", playerId)));
  }

  @Override
  public SquadMember findByGameIdAndId(int gameId, int squadMemberId) {
    return squadMemberRepository
        .findByGameIdAndId(gameId, squadMemberId)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "Squad member with gameID: %d and ID: %d not found.",
                        gameId, squadMemberId)));
  }
}
