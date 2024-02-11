package com.example.hvz.Humans_vs_Zombies.model;

import jakarta.persistence.*;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_user")
public class LoginUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column private String keycloakId;
  @Column private String userName;

  @Column(length = 30, nullable = false)
  private String firstName;

  @Column(length = 30, nullable = false)
  private String lastName;

  @OneToMany(mappedBy = "loginUser")
  private Set<Player> players;
}
