import {Environment} from './environment.model';

export const environmentBase = {
  api: {
    baseUrl: 'http://127.0.0.1:8000/v1',
    path: {
      auth: '/authentication.php',
      mail: '/mail.php',
      joke: '/joke.php',
      maintenance: '/maintenance.php',
      page: '/page.php',
    }
  },
  app: {
    title: 'Jeu De Mots',
  },
  slideshow: {
    minimumTimePerJoke: 5,
    perCharCostFactor: 0.01,
    timerPrecision: 100,
  },
  supportEmail: 'jeudemots@42borgata.com',
} satisfies Omit<Environment, 'production'>;
