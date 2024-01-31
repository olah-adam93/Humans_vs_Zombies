package com.example.hvz.Humans_vs_Zombies.model.DTO;

import lombok.Data;

@Data
public class ChatDTO {
  private Integer id;
  private String message;
  private String faction;
  private String userName;
  private Integer player;
  private Integer game;
}
