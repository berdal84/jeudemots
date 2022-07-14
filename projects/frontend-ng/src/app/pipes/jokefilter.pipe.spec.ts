import { PAGE_MOCK } from '../mocks/page.mock';
import { JokeFilterPipe } from './jokefilter.pipe';

describe('FilterPipe', () => {

  it('create an instance', () => {
    const pipe = new JokeFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter using a single word', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(PAGE_MOCK.jokes, 'second');
    expect(filtered.length).toBe(1);
  });

  it('should filter using a single year', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(PAGE_MOCK.jokes, '2021');
    expect(filtered.length).toBe(1);
  });

  it('should filter using a two words', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(PAGE_MOCK.jokes, 'tester second');
    expect(filtered.length).toBe(1);
  });
});
