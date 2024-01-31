package com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class KillDTO {

  private Integer id;
  private LocalDateTime time;
  private String location;
  private Integer victimId;
  private Integer killerId;
  private Integer game;
}
