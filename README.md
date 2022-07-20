
# Jeu de mots (PHP Backend, Angular/React Front-ends)

<a href="https://github.com/berdal84/jeudemots-ng/actions?query=workflow Node.js CI" title="ng build">
<img src="https://github.com/berdal84/jeudemots-ng/workflows/Node.js CI/badge.svg" />
</a>

This is the source repository for the website [www.relativementutile.fr/jeudemots](https://www.relativementutile.fr/jeudemots).

This repository contains source code for different part of the project:
- projects/backend: PHP sources for the backend part.
- projects/frontend-ng: Angular project (main front-end)

WIP:
- projects/frontend-common: code reusable in each frontend.
- projects/frontend-react: React project (see [www.relativementutile.fr/jeudemots-react](https://www.relativementutile.fr/jeudemots-react))
- projects/frontend-vue: Vue project

### `npm run build`

Launches the build of the subprojects (backend, angular/react frontends). Produce a `./build` subfolder in each subproject folder (see `in projects/`).

*note: the first time, you need to duplicate `projects/backend/config/config.example.php`, rename it to `config.prod.php` and replace the data inside the file by your credentials (depends on the server you plan de deploy).*

### `npm run pack`

Copy the last build files from all subprojects to a global `./dist` folder. This folder will contain the files you need to copy to your web server in order to get the application to work.

*note: The first time you will need to install the database. In order to do that, login to the admin page (add `/admin`to the URL), go to the install section and click on install. Then, If you had previously a backup file, you can restore it.*

# History
This project was first (old repository is [here](https://www.github.com/berdal84/jeudemots)) developped using AngularJS 1.7.x and has been translated for Angular 2+.

