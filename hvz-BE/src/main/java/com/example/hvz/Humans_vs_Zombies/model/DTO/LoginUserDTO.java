package com.example.hvz.Humans_vs_Zombies.model.DTO;

import jakarta.validation.constraints.*;
import java.util.Set;
import lombok.Data;

@Data
public class LoginUserDTO {
  private Integer id;

  @NotNull(message = "KeycloakId must not be null.")
  @NotBlank(message = "KeycloakId must not be blank.")
  private String keycloakId;

  private String userName;
  private String firstName;
  private String lastName;
  private Set<Integer> players;
}
