-- USERS
INSERT INTO tb_user (first_name,last_name,keycloak_id, user_name)
VALUES ('Lilly', 'Cross', 'd7803bef-ecc3-4f96-ad57-94a620cebcb8', 'rotreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Jason', 'Steele', '4c365757-71e6-4d17-abc9-bf43199b6684', 'undeadslayerx');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Sarah', 'Blackwood', '68674810-896c-4d5d-b616-1b3a083bfe59', 'zombiesniperelite');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Alex', 'Cruz', '08eac9ee-b8cb-48fe-bd35-2ea6dd693010', 'apexzombiehunter');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Tristan', 'Graves', 'cd7106c7-74ae-42ff-af5d-e9c16b2459f1', 'necroknight');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Derek', 'Shaw', '8712a459-7c7d-4ed4-9b57-3e59ced7da64', 'infectedinferno');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Emily', 'Darko', 'af47530a-e4f5-4c8a-8dcd-11006db0b4ce', 'ghoulgrimreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Marcus', 'Kane', 'a3d383f2-fa72-49d8-aee6-25660821b1d3', 'pandemicpatriot');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Zoe', 'Storm', '2a33e163-ab28-41b1-bef0-a9d667eb701e', 'biohazardblitz');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Mia', 'Harper', '80c39190-3923-4142-8d8b-bfb94807055c', 'undeadwanderer');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Jordan', 'Harper', '5f34d808-3f32-4941-a4d3-be7e02d98002', 'rottenranger');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Cyber', 'Phoenix', '6a23ec3c-26b0-4f75-8400-f86d1b40c348', 'cyberphoenix');

-- GAMES
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Brussels HVZ', 'Complete', 10, 'Brussels');
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Paris HVZ', 'Registration', 4, 'Paris');
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Beijing HVZ', 'In Progress', 9, 'Beijing');

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
