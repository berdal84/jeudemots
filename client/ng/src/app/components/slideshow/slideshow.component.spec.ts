import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { PAGE_MOCK } from 'src/app/mocks/page.mock';
import { BackendServiceMock } from 'src/app/mocks/backend-service.mock';
import { BackendService } from '../../services/backend.service';
import { SlideshowComponent } from './slideshow.component';

describe(SlideshowComponent.name, () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SlideshowComponent
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
    fixture = TestBed.createComponent(SlideshowComponent);
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
      component.handlePreviousButtonClick();
      expect( component['currentJokeId']).toBe(currentJokeId);
    });

    it('should be able to next at init', () => {
      const currentJokeId = component['currentJokeId'];
      expect( component.hasNext() ).toBeTruthy();
      component.handleNextButtonClick();
      expect( component['currentJokeId']).toBe(currentJokeId+1);
    });

    it('should not be able to go further joke count', () => {
      const currentJokeId = component['currentJokeId'];
      while( component.hasNext() ) {
        component.handleNextButtonClick();
      }
      expect( component['currentJokeId']).toBe(component['jokes'].length-1);
    });

    it('should be able to play slideshow', <any>fakeAsync((): void => {
      spyOn(component, 'onNextButtonClicked');
      component.handlePlayButtonClick();
      tick(10000);
      component.handlePauseButtonClick();
      expect(component.handleNextButtonClick).toHaveBeenCalled();
    }));
  });

});
