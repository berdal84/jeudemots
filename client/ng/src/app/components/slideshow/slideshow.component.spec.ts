import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { PAGE_MOCK } from '../../mocks/page.mock';
import { SlideshowComponent } from './slideshow.component';
import { lastValueFrom } from 'rxjs';
import { ViewModel } from './slideshow.types';
import { BackendTestingModule } from '@services/backend-testing.module';

describe(SlideshowComponent.name, () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SlideshowComponent
      ], imports: [
        BackendTestingModule
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

    let state: ViewModel;
    beforeEach( async () => {
      await component.ngOnInit();
      state = await lastValueFrom(component.viewModel);
    });


    it('should get first joke at init', async () => {
      expect(state.joke).toEqual(PAGE_MOCK.jokes[0]);
    });

    it('should not be able to go back at init', async () => {
      expect( state.hasPrevious ).toBeFalsy();
      component.handleNavBarClick('previous');
      const newState = await lastValueFrom(component.viewModel);
      expect(newState.joke.id).toBe(state.joke.id);
    });

    it('should be able to next at init', async () => {
      const currentJokeId = state.joke.id;
      expect( state.hasNext ).toBeTruthy();
      component.handleNavBarClick('next');
      expect( (await lastValueFrom(component.viewModel)).joke.id).toBe(currentJokeId + 1);
    });

    it('should not be able to go further joke count', async () => {
      let count = 0;
      while ( (await lastValueFrom(component.viewModel)).hasNext ) {
        component.handleNavBarClick('next');
        count++;
      }
      expect( count ).toBe((await lastValueFrom(component.viewModel)).page.jokes.length - 1);
    });
  });

});
