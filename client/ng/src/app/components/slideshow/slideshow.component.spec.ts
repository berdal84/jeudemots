import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { PAGE_MOCK } from '../../mocks/page.mock';
import { BackendServiceMock } from '../../mocks/backend-service.mock';
import { BackendService } from '@servicesbackend.service';
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

    beforeEach(fakeAsync((): void => {
      component.ngOnInit();
      tick();
    }) as any);


    it('should get first joke at init', () => {
      expect(component.currentJoke).toEqual(PAGE_MOCK.jokes[0]);
    });

    it('should not be able to go back at init', () => {
      const currentJokeId = component.currentJoke.id;
      expect( component.hasPrevious() ).toBeFalsy();
      component.handlePreviousButtonClick();
      expect( component.currentJoke.id).toBe(currentJokeId);
    });

    it('should be able to next at init', () => {
      const currentJokeId = component.currentJoke.id;
      expect( component.hasNext() ).toBeTruthy();
      component.handleNextButtonClick();
      expect( component.currentJoke.id).toBe(currentJokeId + 1);
    });

    it('should not be able to go further joke count', () => {
      let count = 0;
      while ( component.hasNext() ) {
        component.handleNextButtonClick();
        count++;
      }
      expect( count ).toBe(component.page.jokes.length - 1);
    });

    it('should be able to play slideshow', fakeAsync((): void => {
      spyOn(component, 'handlePlayButtonClick');
      component.handlePlayButtonClick();
      tick(10000);
      component.handlePauseButtonClick();
      expect(component.handleNextButtonClick).toHaveBeenCalled();
    }));
  });

});
