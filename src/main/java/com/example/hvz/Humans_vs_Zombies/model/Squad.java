package com.example.hvz.Humans_vs_Zombies.model;

import jakarta.persistence.*;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_squad")
public class Squad {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(length = 50, nullable = false)
  private String name;

  @OneToMany(mappedBy = "squad")
  private Set<SquadMember> squadMembers;

  @ManyToOne
  @JoinColumn(name = "game_id")
  private Game game;
}
