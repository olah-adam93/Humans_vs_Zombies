package com.example.hvz.Humans_vs_Zombies.service.chat;

import com.example.hvz.Humans_vs_Zombies.exception.ChatNotFoundException;
import com.example.hvz.Humans_vs_Zombies.model.Chat;
import com.example.hvz.Humans_vs_Zombies.repository.ChatRepository;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

  private final ChatRepository chatRepository;

  @Autowired
  public ChatServiceImpl(ChatRepository chatRepository) {
    this.chatRepository = chatRepository;
  }

  @Override
  public Chat findById(Integer chatId) {
    return chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException(chatId));
  }

  @Override
  public Collection<Chat> findAll() {
    return chatRepository.findAll();
  }

  @Override
  public Chat add(Chat chat) {
    return chatRepository.save(chat);
  }

  @Override
  public Chat update(Chat chat) {

    return chatRepository
        .findById(chat.getId())
        .map(
            existingChat -> {
              chatRepository.save(chat);
              return chat;
            })
        .orElseThrow(() -> new ChatNotFoundException(chat.getId()));
  }

  @Override
  public void deleteById(Integer chatId) {
    chatRepository.findById(chatId).orElseThrow(() -> new ChatNotFoundException(chatId));
    chatRepository.deleteById(chatId);
  }

  @Override
  public void delete(Chat chat) {
    chatRepository.delete(chat);
  }

  @Override
  public Collection<Chat> findAllByGameId(int gameId) {
    return chatRepository.findAllByGameId(gameId);
  }

  @Override
  public Collection<Chat> findAllByGameIdAndFaction(int gameId, String faction) {
    return chatRepository
        .findAllByGameIdAndFaction(gameId, faction)
        .orElseThrow(() -> new ChatNotFoundException(gameId, faction));
  }
}
