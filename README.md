# Group Foodie Order-Share App
<div align="center">
  <img src="https://github.com/erikeh/erikeh-demo-assets/blob/master/GroupFoodie-demo_aug3_v2.gif" alt="group-foodie-demo" />
</div>
	
Group Foodie is an application built around the idea of starting and sharing a group food order among friends or coworkers, with the ability to start an order, chat about the order, and add onto an existing order with a persistent timer that ultimately "submits" the order.

## About
This project was created by a team of 7 (including myself) as a proof of concept demo for a food-delivery app idea. While built in the browser, this application was designed with a mobile-experience in mind. I was the only person on the team that used typescript, so the project is currently a hybrid of javascript and typescript. The structure of the API may be a little overkill for a project of this size (using DTOs to map domain objects, dependency injection etc.), but everything was written with best practices of a scalable project in mind.

## Where should i look to see the work that YOU did?
I was in charge of several things:
1. I designed and wrote the entire API, created the documentation, and structured how our front end would consume it
2. I created all re-usable UI elements such as the navbar, sidebar, buttons, profile picture containers, input fields etc. and saved them in `src/styles/shared.tsx`
3. I created the all the components under `src/components/confirmation` and `src/components/friendsView`
4. I created every animation of the application
5. I did all the webpack/babel/tslint/eslint configuration to work nicely in a hybrid TS & JS project

Due to my code being in typescript, it is quite easy to differentiate what I worked on, and what others worked on.
	
## Quick Start
### Seed Initial Database (WIP)
1. Make copy of src/server/db/example.index.js and example.schema.sql
2. Rename to index.js and schema.sql in same folder
3. If no database, create database groupfoodie on postgres
4. Change copy file path from schema.sql to seed files in src/server/db/seed
```
$ npm run database
```

### Initialize project
1. Run `npm install` to install all packages
2. Run `npm run build` to build a development version to the `public` folder with a `watch` flag
3. Run `npm start` to run the express server in development mode
4. open http://localhost:4000 to view the app in the browser
5. Enable mobile view mode for your browser. (For Google Chrome, press `F12` and then press on `cmd+shift+m` for mobile view)

## Technologies
Project is created with:
* React - Front-end framework
* Redux - State management
* Express - Back-end framework
* Postgres - Database
* Styled-components - CSS management
* Knex - SQL orm/query builder
