# Humans Vs Zombies API

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

**Web API and database** with **Spring**.

This is a web API that contains Users, Games, Players, Squads, Squadmembers, Kills and Chats as entities for the Humans Vs Zombies game
. The main entity relations are as follows:

- *one* **user** can belong to *many* **players**
- *one* **player** can belong to *one* **squad member**
- *one* **player** can contain *many* **chats**
- *one* **game** can contain *many* **squads**
- *one* **game** can contain *many* **kills**
- *one* **game** can contain *many* **players**
- *one* **game** can contain *many* **chats**
- *one* **game** can belong to *many* **squads**
- *one* **squad** can have *many* **squad members**
- *many* **squads** can be part of *one* **game**
- *many* **squad members** can be part of *one* **squad**

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

## Maintainer
- [Adam Olah](https://github.com/olah-adam93)