package com.example.hvz.Humans_vs_Zombies.config;

import java.util.List;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HvzErrorResponse {

  private HttpStatus status;
  private String message;
  private List<String> errors;
}
