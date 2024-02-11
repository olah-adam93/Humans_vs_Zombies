package com.example.hvz.Humans_vs_Zombies.repository;

import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginUserRepository extends JpaRepository<LoginUser, Integer> {
  Optional<LoginUser> findByKeycloakId(String keycloakId);
}
