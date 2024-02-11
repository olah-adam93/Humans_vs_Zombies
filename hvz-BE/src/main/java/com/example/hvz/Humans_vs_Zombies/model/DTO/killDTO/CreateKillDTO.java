package com.example.hvz.Humans_vs_Zombies.model.DTO.killDTO;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CreateKillDTO {
  private Integer id;
  private Integer victimId;
  private Integer killerId;

  @Size(max = 100, message = "Story length must not exceed 100 characters.")
  @Pattern(
      regexp = "^[^;\\/%]*$",
      message = "Story should not contain a semicolon or percentage character.")
  private String story;

  private String location;

  @NotBlank(message = "BiteCode cannot be empty.")
  @Pattern(regexp = "[a-z]+", message = "Given biteCode is invalid.")
  private String biteCode;

  @PastOrPresent private LocalDateTime time;

  @NotBlank(message = "Game id cannot be empty.")
  private Integer game;
}
