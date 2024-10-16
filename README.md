# Humans Vs Zombies

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Web app with **Spring** and **Angular**.

## Table of Contents
- [Background](#background)
- [Usage](#usage)
- [Maintainer](#maintainers)

## Background

Humans vs. Zombies is a web application that was created to demonstrate experience using web technologies.
During the development, I gained experience in technologies such as Java/Spring and TS/Angular, along with cloud-based storage implemented using AWS RDS(PostgreSQL).
In addition, I utilized Keycloak for OAuth2 and OIDC integration.

HvZ is a game of tag. All players begin as humans, and one is randomly chosen to be the “Original Zombie.”
The Original Zombie tags human players and turns them into zombies.

Application contains entities such as Users, Games, Players, Squads, Squad Members, Kills, and Chats for the Humans Vs Zombies game.
The main entity relations are as follows:

- _one_ **user** can belong to _many_ **players**
- _one_ **player** can belong to _one_ **squad member**
- _one_ **player** can contain _many_ **chats**
- _one_ **game** can contain _many_ **squads**
- _one_ **game** can contain _many_ **kills**
- _one_ **game** can contain _many_ **players**
- _one_ **game** can contain _many_ **chats**
- _one_ **game** can belong to _many_ **squads**
- _one_ **squad** can have _many_ **squad members**
- _many_ **squads** can be part of _one_ **game**
- _many_ **squad members** can be part of _one_ **squad**

## API endpoints

#### Users

- **GET** /api/game/loginuser - Get all users
- **POST** /api/game/loginuser - Add new user

#### Games

- **GET** /api/game - Get all games
- **GET** /api/game/:gameId - Get game by ID
- **POST** /api/game - Add a new game
- **PUT** /api/game/:gameId - Update a game
- **DELETE** /api/game/:gameId - Delete a game

#### Players

- **GET** /api/game/:gameId/player - Get all players
- **GET** /api/game/:gameId/player/:playerId - Get player by ID
- **POST** /api/game/:gameId/player - Add a new player
- **PUT** /api/game/:gameId/player/:playerId - Update a player
- **DELETE** /api/game/:gameId/player/:playerId - Delete a player

#### Chats

- **GET** /api/game/:gameId/chat - Get all messages
- **POST** /api/game/:gameId/chat - Add a new message
- **DELETE** /api/game/:gameId/chat/:chatId - Delete a message

#### Kills

- **GET** /api/game/:gameId/kill - Get all kills
- **GET** /api/game/:gameId/kill/:killId - Get kill by ID
- **POST** /api/game/:gameId/kill - Add a new kill
- **PUT** /api/game/:gameId/kill/:killId - Update a kill
- **DELETE** /api/game/:gameId/kill/:killId - Delete a kill

#### Squads

- **GET** /api/game/:gameId/squad - Get all squads
- **GET** /api/game/:gameId/squad/:squadId - Get squad by ID
- **POST** /api/game/:gameId/squad - Add a new squad
- **DELETE** /api/game/:gameId/squad/:squadId - Delete a squad

#### Squad Members

- **GET** /api/game/:gameId/squadmember - Get all squad members
- **GET** /api/game/:gameId/squadmember/:squadmemberId - Get squad member by ID
- **POST** /api/game/:gameId/squadmember - Add a new squad member
- **PUT** /api/game/:gameId/squadmember/:squadmemberId - Update a squad member
- **DELETE** /api/game/:gameId/squadmember/:squadmemberId - Delete a squad member

## Usage
1. Reach the app through: https://humans-vs-zombies-ac24.netlify.app/
2. Test it with a test user:
    - a **user** with username: ```cyberphoenix``` password: ```cyberphoenix01```

## Maintainer

- [Adam Olah](https://github.com/olah-adam93)
