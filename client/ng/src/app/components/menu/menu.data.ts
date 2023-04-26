import { Link } from './menu.models';

export const LINKS: Array<Link> = [
  {
    label: `AUJOURD'HUI`,
    url: '/home'
  },
  {
    label: `LISTE`,
    url: '/list'
  },
  {
    label: 'CONSEILS',
    url: '/advises'
  },
  {
    label: 'CONTRIBUER',
    url: '/contribute'
  },
  {
    label: 'ADMIN',
    url: '/admin',
    private: true
  },
  {
    label: '?',
    url: '/more'
  }
];