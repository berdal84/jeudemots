import { Page } from 'jeudemots-shared';

/**
 * Simple array with two jokes for testing purpose.
 */
const PAGE_MOCK: Page = {
  id: 0,
  size: 4,
  jokes: [
    {
      category: 'cat 1',
      text: 'first text',
      author: 'tester 1',
      date: '2018-01-01'
    },
    {
      category: 'cat 2',
      text: 'second text',
      author: 'tester 2',
      date: '2019-01-02'
    },
    {
      category: 'cat 3',
      text: 'third test',
      author: 'tester 3',
      date: '2020-01-03'
    },
    {
      category: 'cat 4',
      text: 'fourth test',
      author: 'tester 4',
      date: '2021-01-04'
    }
  ]
};

export { PAGE_MOCK }