import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';
import { ActivatedRoute, RouterModule } from '@angular/router';

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        }
      ],
      imports: [
        BackendTestingModule,
        LoginComponent,     
        RouterModule,        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
