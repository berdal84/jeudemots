import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientMock } from '../mocks/http-client.mock';
import { JokeService } from './joke.service';

describe('JokeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useClass: HttpClientMock
      }
    ]
  }));

  it('should be created', () => {
    const service: JokeService = TestBed.get(JokeService);
    expect(service).toBeTruthy();
  });
});
