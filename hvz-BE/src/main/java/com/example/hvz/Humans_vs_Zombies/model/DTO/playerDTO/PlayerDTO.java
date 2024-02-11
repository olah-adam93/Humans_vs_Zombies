package com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO;

import java.util.Set;
import lombok.Data;

@Data
public class PlayerDTO {
  private Integer id;
  private boolean isPatientZero;
  private boolean isHuman;
  private String biteCode;
  private Integer loginUser;
  private Integer squadMember;
  private Integer game;
  private Set<Integer> chats;
}
