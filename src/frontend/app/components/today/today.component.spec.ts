import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { PAGE_MOCK } from 'src/frontend/app/mocks/page.mock';
import { BackendServiceMock } from 'src/frontend/app/mocks/backend-service.mock';
import { BackendService } from 'src/frontend/app/services/backend.service';
import { TodayComponent } from './today.component';

describe(TodayComponent.name, () => {
  let component: TodayComponent;
  let fixture: ComponentFixture<TodayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodayComponent
      ],
      providers: [
        {
          provide: BackendService,
          useClass: BackendServiceMock
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
      expect(component.currentJoke).toEqual(PAGE_MOCK.jokes[0]);
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
