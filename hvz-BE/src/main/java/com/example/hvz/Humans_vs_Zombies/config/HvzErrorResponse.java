package com.example.hvz.Humans_vs_Zombies.config;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class HvzErrorResponse {

  private HttpStatus status;
  private String message;
  private List<String> errors;
}
