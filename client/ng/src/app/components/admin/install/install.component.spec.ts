import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallComponent } from './install.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';

describe('InstallComponent', () => {
  let component: InstallComponent;
  let fixture: ComponentFixture<InstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InstallComponent,
        BackendTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
