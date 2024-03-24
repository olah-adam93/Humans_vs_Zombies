-- USERS
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('John', 'Doe', 'd60e79b6-0766-4266-acf0-cc6fa0e8db3b', 'johndoe');

INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Jane', 'Smith', '4c2229dc-1e06-4e92-a5eb-33662ecc1fc8', 'janesmith');

INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Alice', 'Johnson', 'ff96af5f-050f-4fce-abeb-21ea2e974fa0', 'alicej');

-- GAMES
INSERT INTO tb_game (id, name, state, human_count, location)
VALUES (1, 'London HvZ', 'Registration', 10, 'London');

INSERT INTO tb_game (id, name, state, human_count, location)
VALUES (2, 'Paris HvZ', 'Registration', 8, 'Paris');

INSERT INTO tb_game (id, name, state, human_count, location)
VALUES (3, 'Tokyo HvZ', 'In Progress', 15, 'Tokyo');

-- PLAYERS
-- game 1
INSERT INTO tb_player (is_patient_zero, is_Human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 1, '0011');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 1, '0101');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('true', 'false', 3, 1, '1100');

-- game 2
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 2, '0011');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 2, '0101');

-- game 3
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 3, '0011');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 3, '0101');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('true', 'false', 3, 3, '1100');
