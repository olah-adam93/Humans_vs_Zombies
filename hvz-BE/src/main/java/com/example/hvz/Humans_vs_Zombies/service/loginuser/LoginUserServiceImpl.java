package com.example.hvz.Humans_vs_Zombies.service.loginuser;

import com.example.hvz.Humans_vs_Zombies.exception.LoginUserNotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.LoginUser;
import com.example.hvz.Humans_vs_Zombies.repository.LoginUserRepository;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginUserServiceImpl implements LoginUserService {

  private final LoginUserRepository loginUserRepository;

  @Autowired
  public LoginUserServiceImpl(LoginUserRepository loginUserRepository) {
    this.loginUserRepository = loginUserRepository;
  }

  @Override
  public LoginUser findById(Integer userId) {
    return loginUserRepository
        .findById(userId)
        .orElseThrow(() -> new LoginUserNotFoundException(userId));
  }

  @Override
  public Collection<LoginUser> findAll() {
    return loginUserRepository.findAll();
  }

  @Override
  public LoginUser add(LoginUser user) {
    return loginUserRepository.save(user);
  }

  @Override
  public LoginUser update(LoginUser user) {
    return loginUserRepository
        .findById(user.getId())
        .map(
            existingUser -> {
              loginUserRepository.save(user);
              return user;
            })
        .orElseThrow(() -> new LoginUserNotFoundException(user.getId()));
  }

  @Override
  public void deleteById(Integer userId) {
    loginUserRepository.findById(userId).orElseThrow(() -> new LoginUserNotFoundException(userId));
    loginUserRepository.deleteById(userId);
  }

  @Override
  public void delete(LoginUser user) {
    loginUserRepository.delete(user);
  }

  @Override
  public LoginUser findByKeycloakId(String keycloakId) {
    return loginUserRepository
        .findByKeycloakId(keycloakId)
        .orElseThrow(() -> new LoginUserNotFoundException(keycloakId));
  }
}
