# Jeu De Mots

[![ui](https://github.com/berdal84/jeudemots/actions/workflows/ui.yml/badge.svg?branch=master&event=status)](https://github.com/berdal84/jeudemots/actions/workflows/ui.yml)
[![api](https://github.com/berdal84/jeudemots/actions/workflows/api.yml/badge.svg?branch=master&event=status)](https://github.com/berdal84/jeudemots/actions/workflows/api.yml)
[![db](https://github.com/berdal84/jeudemots/actions/workflows/db.yml/badge.svg?branch=master&event=status)](https://github.com/berdal84/jeudemots/actions/workflows/db.yml)

## Introduction

_Jeu De Mots_ is a web application to host jokes developed with Angular and PHP.

Try it: [https://jeudemots.42borgata.com](https://jeudemots.42borgata.com)

<div align="center">
  <img width="100%" height="100%" src="./docs/screenshot.png" />
  <p>Angular Frontend | Slideshow capture<p/>
</div>

## Quick start

### Prerequisites

_Prerequisites: docker is **required**._

### Launch

Run the following command to build and launch the app:

```
docker compose up -d
```

Browse `https://localhost:4200/`

### Post-launch (do once)

Browse `https://localhost:4200/#/login` and login with the following credentials:
- username/pass: `admin`/`admin`

<div align="center">
  <img height=300 src="./docs/login-page.png" />
</div>

Once logged, install the app by following the instructions of the `install` section.

<div align="center">
  <img width="100%" height="100%" src="./docs/install-page.png" />
  <img height=100 src="./docs/install-confirmation.png" />
</div>

## Project files

Quick summary of the project's folder hierarchy:

- `./ui/ng`: Angular sources
- `./ui/shared`: shared code and resources
- `./ui/react`: WIP alternative React sources (deployed
  at [here](https://jeudemots.42borgata.com/react))
- `./ui/vue`: WIP alternative Vue frontend (deployed
  at [here](https://jeudemots.42borgata.com/vue))
- `./api`: api source
- `./db`: database sources


## History

This project started in 2015 during my training at Montpellier Institute of Technology (France), it was developed using
AngularJS 1.7.x and has been translated for Angular 2+ in 2019. The old AngularJS repository is still
available [here](https://www.github.com/berdal84/jeudemots)).

Later in 2022, I decided to implement a backend in PHP8 to store jokes as a MySQL relational database instead of a JSON
file. Additionally, the admin can install/uninstall and restore/backup the table content. After that, I also started to
implement alternative frontends using React and Vue, those are still WIP.
