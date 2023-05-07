import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UninstallComponent } from './uninstall.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';

describe('UninstallComponent', () => {
  let component: UninstallComponent;
  let fixture: ComponentFixture<UninstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BackendTestingModule,
        UninstallComponent
      ]  
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UninstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
