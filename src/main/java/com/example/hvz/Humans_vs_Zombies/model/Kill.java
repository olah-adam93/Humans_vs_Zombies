package com.example.hvz.Humans_vs_Zombies.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_kill")
public class Kill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column private LocalDateTime time;
  @Column private String location;
  @Column private Integer victimId;
  @Column private Integer killerId;
  @Column private String story;

  @ManyToOne
  @JoinColumn(name = "game_id")
  private Game game;
}
