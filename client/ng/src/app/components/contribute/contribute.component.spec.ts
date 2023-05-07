import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContributeComponent } from './contribute.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';

describe('ContributeComponent', () => {
  let component: ContributeComponent;
  let fixture: ComponentFixture<ContributeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ContributeComponent,
        BackendTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a joke when form is valid', () => {

    // fill form
    const f = component.form;

    f.setValue({
      category: 'Unit test',
      text: 'This is a unit test.',
      author: 'developer',
      acceptTerms: true,
    });
    expect(f.invalid).toBeFalsy();

    expect(component.status).not.toBe('ok');
    component.onSubmit();
    expect(component.status).toBe('ok');
  });
});
