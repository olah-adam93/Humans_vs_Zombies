package com.example.hvz.Humans_vs_Zombies.model.DTO.squadDTO;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.Set;

@Data
public class SquadDTO {
  private Integer id;

  @NotBlank(message = "Name must not be empty.")
  private String name;

  private Set<Integer> squadMembers;

  @NotNull(message = "Game must not be null.")
  private Integer game;
}
