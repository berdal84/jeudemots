import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SlideshowComponent } from './slideshow.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';

describe(SlideshowComponent.name, () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SlideshowComponent,
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

});
