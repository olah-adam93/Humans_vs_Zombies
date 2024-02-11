package com.example.hvz.Humans_vs_Zombies.service.loginuser;

import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import com.example.hvz.Humans_vs_Zombies.service.CrudService;
import org.springframework.stereotype.Service;

@Service
public interface LoginUserService extends CrudService<LoginUser, Integer> {

  LoginUser findByKeycloakId(String keycloakId);
}
