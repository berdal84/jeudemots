import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { BackendTestingModule } from '@components/backend/backend-testing.module';
import { ActivatedRoute, RouterModule } from '@angular/router';

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

describe('DashboardComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: ActivatedRoute,
        useValue: fakeActivatedRoute
      }],
      imports: [
        AdminComponent,
        BackendTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
