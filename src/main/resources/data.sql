-- USERS
INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('John', 'Doe', '123e4567-e89b-12d3-a456-426614174000', 'johndoe');

INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Jane', 'Smith', '98765432-1a2b-3c4d-5e6f-abcdef123456', 'janesmith');

INSERT INTO tb_user (first_name, last_name, keycloak_id, user_name)
VALUES ('Alice', 'Johnson', 'abcdef12-3456-789a-bcde-f123456789ab', 'alicej');

-- GAMES
INSERT INTO tb_game (name, state, human_count, location)
VALUES ('London HvZ', 'Registration', 10, 'London');

INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Paris HvZ', 'Registration', 8, 'Paris');

INSERT INTO tb_game (name, state, human_count, location)
VALUES ('Tokyo HvZ', 'Registration', 15, 'Tokyo');

-- PLAYERS
-- game 1
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 1, 'abc123');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 1, 'def456');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 3, 1, 'ghi789');

-- game 2
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 2, 'xyz987');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 2, 'uvw654');

-- game 3
INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 1, 3, '123abc');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 2, 3, '456def');

INSERT INTO tb_player (is_patient_zero, is_human, login_user_id, game_id, bite_code)
VALUES ('false', 'true', 3, 3, '789ghi');
