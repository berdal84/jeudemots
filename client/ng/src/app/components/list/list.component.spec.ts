import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BackendServiceMock } from 'src/app/mocks/backend-service.mock';
import { BackendService } from '../../services/backend.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        NgControl,
      ],
      imports: [
        BrowserModule,
        FormsModule,
      ],
      providers: [
        {
          provide: BackendService,
          useClass: BackendServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
