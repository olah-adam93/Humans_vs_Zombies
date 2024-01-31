package com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO;

import lombok.Data;
import java.util.Set;

@Data
public class CreateSquadDTO {
  private Integer id;
  private Integer playerId;
  private String name;
  private Set<Integer> squadMembers;
  private Integer game;
}
