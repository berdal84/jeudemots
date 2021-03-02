import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JokeServiceMock } from 'src/app/mocks/joke-service.mock';
import { JokeService } from 'src/app/services/joke.service';

import { ContributeComponent } from './contribute.component';

describe('ContributeComponent', () => {
  let component: ContributeComponent;
  let fixture: ComponentFixture<ContributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContributeComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: JokeService,
          useClass: JokeServiceMock
        }
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
    const f = component.contributeForm;
    f.get('category').setValue('Unit test');
    f.get('email').setValue('test@unit.fr');
    f.get('text').setValue('This is a unit test.');
    f.get('author').setValue('developer');
    f.get('acceptTerms').setValue(true);

    expect(f.invalid).toBeFalsy();
    
    expect(component.submitted).toBeFalsy();
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });
});
