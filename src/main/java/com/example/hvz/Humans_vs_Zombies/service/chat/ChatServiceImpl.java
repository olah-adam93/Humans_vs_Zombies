package com.example.hvz.Humans_vs_Zombies.service.chat;

import com.example.hvz.Humans_vs_Zombies.exception.BadRequestException;
import com.example.hvz.Humans_vs_Zombies.exception.NotFoundException;
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
    return chatRepository
        .findById(chatId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Chat with ID: %s not found.", chatId)));
  }

  @Override
  public Collection<Chat> findAll() {
    return chatRepository.findAll();
  }

  @Override
  public Chat add(Chat chat) {

    chatRepository
        .findById(chat.getId())
        .ifPresent(
            existingChat -> {
              throw new BadRequestException(
                  String.format("Chat with ID: %s already exists.", chat.getId()));
            });

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
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format("Chat with ID: %s does not exist.", chat.getId())));
  }

  @Override
  public void deleteById(Integer chatId) {
    chatRepository
        .findById(chatId)
        .orElseThrow(
            () -> new NotFoundException(String.format("Chat with ID: %s not found.", chatId)));

    chatRepository.deleteById(chatId);
  }

  @Override
  public void delete(Chat chat) {
    chatRepository.delete(chat);
  }

  @Override
  public Collection<Chat> findAllByGameIdAndFaction(int gameId, String faction) {
    return chatRepository
        .findAllByGameIdAndFaction(gameId, faction)
        .orElseThrow(
            () ->
                new NotFoundException(
                    String.format(
                        "No chats found for gameID: %d and Faction: %s", gameId, faction)));
  }
}
