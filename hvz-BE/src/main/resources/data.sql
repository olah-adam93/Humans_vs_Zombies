-- USERS
INSERT INTO tb_user (first_name,last_name,keycloak_id, user_name)
VALUES ('Lilly', 'Cross', '807dac49-19f3-4fc3-8bbc-396c0360f336', 'rotreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Jason', 'Steele', '6d065260-af2a-4acd-bf53-9d4f7ce5e66a', 'undeadslayerx');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Sarah', 'Blackwood', '1fd68206-16df-49fe-a8c7-0723b2b3cb08', 'zombiesniperelite');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Alex', 'Cruz', 'c27235de-0cfb-4164-b5c9-ecf4766bc0b1', 'apexzombiehunter');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Tristan', 'Graves', '0ed604f5-ea20-4e5f-9db7-9dd7428a46e8', 'necroknight');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Derek', 'Shaw', '7ae954f1-9464-49c4-aee0-b3245ab0021f', 'infectedinferno');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Emily', 'Darko', '4ad28fcd-7251-43d1-9e5e-d82a30a22f01', 'ghoulgrimreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Marcus', 'Kane', '31cf25b6-37f9-4f17-a4f8-b5d32de3baae', 'pandemicpatriot');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Zoe', 'Storm', '9dc94439-6bfd-401e-b104-6a5d1d35b1b2', 'biohazardblitz');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Mia', 'Harper', '2fb3ba46-7a50-4482-87d3-8a91d3f7e120', 'undeadwanderer');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Jordan', 'Harper', '47090f5f-2e54-45f6-a35f-8259e3e55e28', 'rottenranger');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Cyber', 'Phoenix', 'c8d0bf94-c8ab-4995-888e-91e1b0a74ea7', 'cyberphoenix');

-- GAMES
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Shanghai HVZ', 'Complete', 10, 'Shanghai');
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Chicago HVZ', 'Registration', 4, 'Chicago');
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Vienna HVZ', 'In Progress', 9, 'Vienna');

-- PLAYERS
-- game 1
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'false', 1, 1, '0010');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('true', 'false', 2, 1, '1101');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 3, 1, '1000');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 4, 1, '0111');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 5, 1, '0100');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 6, 1, '1011');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 7, 1, '1110');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 8, 1, '0001');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 9, 1, '1100');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 10, 1, '0011');
INSERT INTO tb_player (is_patient_zero,is_human,login_user_id,game_id,bite_code)
VALUES('false', 'false', 11, 1, '1111');

-- game 2
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 2, '0011');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 6, 2, '0101');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 9, 2, '1100');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 10, 2, '0111');

-- game 3
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 3, '0011');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 3, '0101');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 3, 3, '1100');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 4, 3, '1010');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 5, 3, '1001');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 6, 3, '0110');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 7, 3, '1111');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 8, 3, '0000');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 9, 3, '0100');
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('true', 'false', 12, 3, '0001');

-- CHATS
-- game 1
-- global faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Hey everyone, let s stick together and survive!', 'global', 'undeadslayerx', 2, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Anybody got extra ammo? Im running low!', 'global', 'zombiesniperelite', 3, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Stay alert, zombies might be lurking around every corner.', 'global', 'apexzombiehunter', 4, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Found a safe spot, come over here if you need a breather.', 'global', 'necroknight', 5, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Let us fortify this area, we need a secure base.', 'global', 'infectedinferno', 6, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('I hear something moving, be ready for a zombie attack!', 'global', 'ghoulgrimreaper', 7, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Keep an eye out for medical supplies, we might need them later.', 'global', 'pandemicpatriot', 8, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Stay calm and focused, dont let fear take over.', 'global', 'biohazardblitz', 9, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Let s move quietly, we dont want to attract unnecessary attention.', 'global', 'undeadwanderer', 10, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Got a visual on a zombie horde, prepare for a fight!', 'global', 'rottenranger', 11, 1);
-- human faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Stay strong, we can beat them!', 'human', 'zombiesniperelite', 3, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We fight for our survival, for our future!', 'human', 'apexzombiehunter', 4, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Remember, teamwork is our greatest weapon.', 'human', 'necroknight', 5, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Keep moving, dont let them corner us!', 'human', 'infectedinferno', 6, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We will not let fear dictate our actions, stay focused!', 'human', 'ghoulgrimreaper', 7, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Check your supplies, make sure we re ready for anything.', 'human', 'pandemicpatriot', 8, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Every zombie we take down is a victory for humanity.', 'human', 'biohazardblitz', 9, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We will make it through this, together!', 'human', 'undeadwanderer', 10, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Hold the line, dont let them break through!', 'human', 'rottenranger', 11, 1);
-- zombie faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Join us, become one with the horde!', 'zombie', 'undeadslayerx', 2, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('The hunger... it consumes me.', 'zombie', 'zombiesniperelite', 3, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('The living will soon be the undead, embrace it.', 'zombie', 'apexzombiehunter', 4, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We are the unstoppable force of nature.', 'zombie', 'necroknight', 5, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Fresh meat... delicious.', 'zombie', 'infectedinferno', 6, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('No place is safe from the inevitable.', 'zombie', 'ghoulgrimreaper', 7, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Surrender to the hunger, it is futile to resist.', 'zombie', 'pandemicpatriot', 8, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('The infection spreads, soon all will join our ranks.', 'zombie', 'biohazardblitz', 9, 1);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We are the end of days, the beginning of the new world.', 'zombie', 'undeadwanderer', 10, 1);

-- game 3
-- global faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Stay focused, we can survive this!', 'global', 'apexzombiehunter', 4, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Keep communication open, it s our lifeline.', 'global', 'infectedinferno', 5, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Let s coordinate our efforts, together we re stronger.', 'global', 'ghoulgrimreaper', 7, 3);
-- human faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Let s make a plan to fortify our position.', 'human', 'undeadslayerx', 2, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('Keep your eyes peeled for any signs of zombies.', 'human', 'rottenranger', 6, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We need to find a way out of here, fast!', 'human', 'pandemicpatriot', 9, 3);
-- zombie faction
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('The living will soon join our ranks.', 'zombie', 'zombiesniperelite', 3, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('We hunger for flesh, the time is near.', 'zombie', 'biohazardblitz', 9, 3);
INSERT INTO tb_chat (message, faction, user_name, player_id, game_id)
VALUES('The night belongs to us, the undead.', 'zombie', 'rottenranger', 6, 3);
