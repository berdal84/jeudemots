import { JOKE_ARRAY_MOCK } from '../mocks/joke-array.mock';
import { JokeFilterPipe } from './jokefilter.pipe';

describe('FilterPipe', () => {

  it('create an instance', () => {
    const pipe = new JokeFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter using a single word', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(JOKE_ARRAY_MOCK, 'second');
    expect(filtered.length).toBe(1);
  });

  it('should filter using a single year', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(JOKE_ARRAY_MOCK, '2021');
    expect(filtered.length).toBe(1);
  });

  it('should filter using a two words', () => {
    const pipe = new JokeFilterPipe();
    const filtered = pipe.transform(JOKE_ARRAY_MOCK, 'tester second');
    expect(filtered.length).toBe(1);
  });
});
