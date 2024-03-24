package com.example.hvz.Humans_vs_Zombies.model.DTO.playerDTO;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PlayerDTO {
  private Integer id;
  @JsonProperty("isPatientZero")
  private boolean isPatientZero;
  @JsonProperty("isHuman")
  private boolean isHuman;
  private String biteCode;
  private Integer loginUser;
  private Integer squadMember;
  private Integer game;
  private Set<Integer> chats;
}
