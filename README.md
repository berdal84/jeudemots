
# Jeu de mots (PHP Backend, Angular Frontend & React/Vue alternative Frontends)

<a href="https://github.com/berdal84/jeudemots-ng/actions?query=workflow Node.js CI" title="ng build">
<img src="https://github.com/berdal84/jeudemots-ng/workflows/Node.js CI/badge.svg" />
</a>

## Introduction

This is the source repository for the website [http://art.42borgata.com/jeudemots](http://art.42borgata.com/jeudemots), a client-server solution to host jokes using PHP8/MySQL and Angular. Two alternative React/Vue frontends are work in progress.

<div align="center">
  <img width="75%" height="75%" src="https://user-images.githubusercontent.com/942052/180222208-a69cdd30-a730-4cb8-907f-27b67ad6e844.png" />
  <p>Angular Frontend | home page capture<p/>
</div>

## Project files

This repository contains source code for different parts of the project:
- `projects/backend`: backend PHP sources files
- `projects/frontend-ng`: main Angular frontend sources


WIP:
- `projects/frontend-react`: alternative React frontend sources (deployed at [http://art.42borgata.com/jeudemots-react](http://art.42borgata.com/jeudemots-react))
- `projects/frontend-vue`: alternative Vue frontend sources (deployed at [http://art.42borgata.com/jeudemots-vue](http://art.42borgata.com/jeudemots-vue))
- `projects/frontend-common`: code reusable in each frontend.

## Development
### `npm run build`

Launches the build of the subprojects (backend, angular/react frontends). Produce a `./build` subfolder in each subproject folder (see `in projects/`).

*note: the first time, before launching the command, you need to duplicate `projects/backend/config/config.sample.php`, rename it to `config.prod.php` and replace the data inside the file with your credentials (depends on your server config). If not, the backend build will fail.*

### `npm run pack`

Copy the last build files from all subprojects to a global `./dist` folder. This folder will contain the files you need to copy to your web server to get the application to work.

*note: The first time you will need to install the database. To do that, sign in to the admin page (add `/admin`to the URL), go to the install section and click on install. Then, you can optionnaly restore a previously backed up file.*

## History

This project started in 2015 during my training at Montpellier Institute of Technology (France), it was developed using AngularJS 1.7.x and has been translated for Angular 2+ in 2019. The old AngularJS repository is still available [here](https://www.github.com/berdal84/jeudemots)).

Later in 2022, I decided to implement a backend in PHP8 to store jokes as a MySQL relational database instead of a JSON file. Additionally, the admin can install/uninstall and restore/backup the table content. After that, I also started to implement alternative frontends using React and Vue, those are still WIP.

## TODO

0 - refactor
  - replace table by divs in list.component
  - show a progress message when searching in list.component
 
1 - services
  - front-ng: extract Split BackendService to BackendService (frontend-ng) and BackendAPI (frontend-common)
  - front-ng: extract Split UserService to UserService (frontend-ng) and UserAPI (frontend-common)
  - front-react/vue: reuse frontend-common's UserAPI
  - front-react/vue: reuse frontend-common's BackendAPI
  
2 - style
  - front-ng: extract CSS to get a common.css + customizable theme.css (a base exists in frontend-react)
  - front-ng: think about responsiveness
  
3 - components
  - front-react/vue: implem all ng existing components.
  - front-react/vue: reuse common.css and theme.css

