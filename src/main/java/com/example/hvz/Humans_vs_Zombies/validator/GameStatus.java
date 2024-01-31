package com.example.hvz.Humans_vs_Zombies.validator;

import static java.lang.annotation.ElementType.FIELD;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target(FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = GameStatusValidator.class)
public @interface GameStatus {

  String message() default "{game.status.invalid}";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
