-- USERS
INSERT INTO tb_user (first_name,last_name,keycloak_id, user_name)
VALUES ('Lilly', 'Cross', '1d6b39c0-8047-4c9c-97a4-756214b47c0b', 'rotreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Jason', 'Steele', '9c56f321-2426-45f4-8d45-b35398b50784', 'undeadslayerx');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Sarah', 'Blackwood', 'd1537b39-7c42-4497-9ad7-942ee48cb701', 'zombiesniperelite');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Alex', 'Cruz', '09a4a58f-6324-4065-b256-31b446be742f', 'apexzombiehunter');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Tristan', 'Graves', 'f7e9214b-9cc5-477b-a487-72b5cddbcc0c', 'necroknight');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Derek', 'Shaw', '2fcc9d34-61aa-475d-ae68-4fc0c7753b84', 'infectedinferno');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Emily', 'Darko', '86f22342-f38b-4f5e-8845-6d98176a9c04', 'ghoulgrimreaper');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Marcus', 'Kane', '0dc29aa8-de4f-4e36-a725-aaed03c53bb1', 'pandemicpatriot');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Zoe', 'Storm', 'f78a6b95-883c-462d-82fe-6970c2167b71', 'biohazardblitz');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Mia', 'Harper', 'b23f786a-9882-43aa-86e0-c9e9d25ed7f2', 'undeadwanderer');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Jordan', 'Harper', 'e2efa538-83d9-4c7d-b3ae-4b512ca76bc4', 'rottenranger');
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES('Cyber', 'Phoenix', '8f2f29f3-25b0-4a79-af3f-2fb321619dc7', 'cyberphoenix');

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
