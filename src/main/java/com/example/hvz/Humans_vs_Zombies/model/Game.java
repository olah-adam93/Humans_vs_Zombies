package com.example.hvz.Humans_vs_Zombies.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_game")
public class Game {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(length = 50, nullable = false)
  private String name;

  @Column(length = 20, nullable = false)
  private String state;

  @Column private String location;
  @Column private LocalDateTime date;

  @OneToMany(mappedBy = "game")
  private Set<Squad> squads;

  @OneToMany(mappedBy = "game")
  private Set<Kill> kills;

  @OneToMany(mappedBy = "game")
  private Set<Player> players;

  @Column private Integer humanCount;

  @OneToMany(mappedBy = "game")
  private Set<Chat> chats;
}
