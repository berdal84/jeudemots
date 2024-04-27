# Jeu de mots

<a href="https://github.com/berdal84/jeudemots-ng/actions?query=workflow Node.js CI" title="ng build">
<img src="https://github.com/berdal84/jeudemots-ng/workflows/Node.js CI/badge.svg" />
</a>

## Introduction

_Jeu De Mots_ is a web application to host jokes developed with Angular and PHP.

Try it: [https://jeudemots.42borgata.com](https://jeudemots.42borgata.com)

<div align="center">
  <img width="100%" height="100%" src="./screenshot.png" />
  <p>Angular Frontend | Slideshow capture<p/>
</div>

## How to use ?

### Prerequisites

_Prerequisites: nodejs/npm and docker are **required**._

### Install

To install the project, run* the following command

```
./install.sh
```

> *Check script content to see what's happening before to run it. First execution might take a while. You might also need to make the file executable with `chmod +x install.sh`.

### How to run ? (locally)

Be sure you installed first.

Then, run* the following command:

```
./dev-ng.sh
```

Follow the instructions to browse to the home page.

> *Check content prior to run.
> 
> This script will make sure the - local - backend services are up, and will run the angular dev server.
>
> **First Launch**: Database needs to be initialized. Sign in to the admin page (add `/admin`to the
URL), and go to the installation section and click on install. Then, you can optionally restore a previously backed up file from this place.

### How to build ?

Then, run* the following command:

```
./build.sh
```

> *Check file content before to run. This script will build the backend dockers and frontend packages.

### How to create a package ?

Then, run* the following command:

```
./pack.sh
```

> *Check file content before to run. This script will copy all the built files into `./dist` folder. 


## Project files

Source code is split in two main folders:

- `server`: backend PHP sources and config files.
- `client/ng`: main Angular frontend sources

WIP:

- `client/react-js`: alternative React frontend sources (deployed
  at [https://jeudemots.42borgata.com/react](https://jeudemots.42borgata.com/react))
- `client/vue`: alternative Vue frontend sources (deployed
  at [https://jeudemots.42borgata.com/vue](https://jeudemots.42borgata.com/vue))
- `client/shared`: shared code and resources.

## History

This project started in 2015 during my training at Montpellier Institute of Technology (France), it was developed using
AngularJS 1.7.x and has been translated for Angular 2+ in 2019. The old AngularJS repository is still
available [here](https://www.github.com/berdal84/jeudemots)).

Later in 2022, I decided to implement a backend in PHP8 to store jokes as a MySQL relational database instead of a JSON
file. Additionally, the admin can install/uninstall and restore/backup the table content. After that, I also started to
implement alternative frontends using React and Vue, those are still WIP.
