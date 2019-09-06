import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisesComponent } from './advises.component';

describe('AdvisesComponent', () => {
  let component: AdvisesComponent;
  let fixture: ComponentFixture<AdvisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
