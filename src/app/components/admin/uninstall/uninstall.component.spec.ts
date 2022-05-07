import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UninstallComponent } from './uninstall.component';

describe('UninstallComponent', () => {
  let component: UninstallComponent;
  let fixture: ComponentFixture<UninstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UninstallComponent ]
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
