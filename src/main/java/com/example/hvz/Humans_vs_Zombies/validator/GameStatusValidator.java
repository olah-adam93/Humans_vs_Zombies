package com.example.hvz.Humans_vs_Zombies.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GameStatusValidator implements ConstraintValidator<GameStatus, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return value.equals("Registration") || value.equals("In Progress") || value.equals("Complete");
  }
}
