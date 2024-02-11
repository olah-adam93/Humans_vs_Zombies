package com.example.hvz.Humans_vs_Zombies.model;

import jakarta.persistence.*;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_player")
public class Player {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private boolean isPatientZero;

  @Column(nullable = false)
  private boolean isHuman;

  @Column private String biteCode;

  @ManyToOne
  @JoinColumn(name = "loginUser_id")
  private LoginUser loginUser;

  @OneToOne(mappedBy = "player")
  private SquadMember squadMember;

  @ManyToOne
  @JoinColumn(name = "game_id")
  private Game game;

  @OneToMany(mappedBy = "player")
  private Set<Chat> chats;
}
