import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { JOKE_ARRAY_MOCK } from 'src/app/mocks/joke-array.mock';
import { JokeServiceMock } from 'src/app/mocks/joke-service.mock';
import { JokeService } from 'src/app/services/joke.service';
import { TodayComponent } from './today.component';

describe(TodayComponent.name, () => {
  let component: TodayComponent;
  let fixture: ComponentFixture<TodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodayComponent
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
    fixture = TestBed.createComponent(TodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Basic', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });
  
  describe('Advanced', () => {

    beforeEach(<any>fakeAsync((): void => {
      component.ngOnInit();
      tick();
    }));

    
    it('should get first joke at init', () => {
      expect(component.currentJoke).toEqual(JOKE_ARRAY_MOCK[0]);
    });

    it('should not be able to go back at init', () => {
      const currentJokeId = component['currentJokeId'];
      expect( component.hasPrevious() ).toBeFalsy();      
      component.onPreviousButtonClicked();
      expect( component['currentJokeId']).toBe(currentJokeId);
    });

    it('should be able to next at init', () => {
      const currentJokeId = component['currentJokeId'];
      expect( component.hasNext() ).toBeTruthy();
      component.onNextButtonClicked();
      expect( component['currentJokeId']).toBe(currentJokeId+1);
    });

    it('should not be able to go further joke count', () => {
      const currentJokeId = component['currentJokeId'];
      while( component.hasNext() ) {
        component.onNextButtonClicked();
      }
      expect( component['currentJokeId']).toBe(component['jokes'].length-1);
    });

    it('should be able to play diaporama', <any>fakeAsync((): void => {
      spyOn(component, 'onNextButtonClicked');
      component.onPlayButtonClicked();
      tick(10000);
      component.onPauseButtonClicked();
      expect(component.onNextButtonClicked).toHaveBeenCalled();
    }));
  });

});
