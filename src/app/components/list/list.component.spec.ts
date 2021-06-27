import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JokeServiceMock } from 'src/app/mocks/joke-service.mock';
import { JokeFilterPipe } from 'src/app/pipes/jokefilter.pipe';
import { JokeService } from 'src/app/services/joke.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        JokeFilterPipe
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [
        {
          provide: JokeService,
          useClass: JokeServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
