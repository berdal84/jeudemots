import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UninstallComponent } from './uninstall.component';
import { BackendTestingModule } from '@services/backend-testing.module';

describe('UninstallComponent', () => {
  let component: UninstallComponent;
  let fixture: ComponentFixture<UninstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UninstallComponent ],
      imports: [BackendTestingModule]
  
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
