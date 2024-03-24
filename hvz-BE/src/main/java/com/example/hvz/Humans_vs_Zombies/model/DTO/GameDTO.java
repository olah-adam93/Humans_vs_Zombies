package com.example.hvz.Humans_vs_Zombies.model.DTO;

import com.example.hvz.Humans_vs_Zombies.validator.CreateGameConstraint;
import com.example.hvz.Humans_vs_Zombies.validator.GameStatus;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.*;
import lombok.Data;

@Data
public class GameDTO {

  @Null(groups = CreateGameConstraint.class)
  private Integer id;

  private String name;

  @GameStatus private String state;
  private String location;
  private LocalDateTime date;
  private Set<Integer> squads;
  private Set<Integer> kills;
  private Set<Integer> players;
  private Integer humanCount;
  private Set<Integer> chats;
}
