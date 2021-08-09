# group-foodie


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Browser based app for mobile experience of scheduling a group food order

## Technologies
Project is created with:
* React version: 17.02
* Redux version 4.1.0
* Express version: 4.17.1
* Postgres version: 8.6.0

## Setup
### Seed Initial Database (WIP)
* Make copy of src/server/db/example.index.js and example.schema.sql
* Rename to index.js and schema.sql in same folder
* If no database, create database groupfoodie on postgres
* Change copy file path from schema.sql to seed files in src/server/db/seed
```
$ npm run database
```

### Initialize project
To run this project, install it locally using npm:

```
$ cd ../group-foodie
$ npm install
$ npm build
$ npm start
```

