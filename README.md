
# Groupomania


Description : Créez un réseau social d’entreprise.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. 
Le but de cet outil est de faciliter les interactions entre collègues. 
Le département RH de Groupomania a imaginé plusieurs fonctionnalités 
pour favoriser les échanges entre collègues.

## Prérequis

Veuillez installer les Prérequis si ce n'est pas déja le cas

- Nodejs -> https://nodejs.org/fr/download/
- npm -> https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Mysql -> https://dev.mysql.com/downloads/installer/


## Installation

Avant de commencer vous devez  créer la base de donnée -> groupomania
Il est possible d'utilisé un autre nom mais il faudra au préalable changé la variable 'DB_NAME'
dans le .env qui se situe au niveau du dossier backend. 
Ensuite vous pourrez importer la base de donnée qui vous a été transmis.
Veuillez également modifer DB_USER et DB_PASSWORD si vous n'avez pas la même configuration pour la connexion de Mysql

## Backend

Dans le dossier backend lancer les commandes suivantes


```bash
  npm install
```
  puis

```bash
  npm start
```

le serveur devrai se lancer sur l'adresse suivante http://localhost:3000

## FrontEnd

Dans le dossier frontend lancer les commandes suivantes

```bash
  npm install
```
  puis

```bash
  npm start
```

Une page devrai s'ouvrir automatiquement à l'adresse suivante http://localhost:3006
Si ce n'est pas le cas connecté vous à cette adresse.


## Tech Stack

Nodejs, Express, Mysql, Sequelize, React

