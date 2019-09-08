import { JokeFilterPipe } from './jokefilter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new JokeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
