import {Environment} from './environment.model';

export const environmentBase = {
  api: {
    baseUrl: 'https://jeudemots.42borgata.com/api',
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
  },
  supportEmail: 'jeudemots@42borgata.com',
} satisfies Omit<Environment, 'production'>;
