import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/app.routes';
import { AdvisesComponent } from '@components/advises/advises.component';
import { ContributeComponent } from '@components/contribute/contribute.component';
import { Error404Component } from '@components/error404/error404.component';
import { ListComponent } from '@components/list/list.component';
import { MoreComponent } from '@components/more/more.component';
import { SlideshowComponent } from '@components/slideshow/slideshow.component';
import { MenuComponent } from './menu.component';
import { BackendTestingModule } from '@services/backend-testing.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        SlideshowComponent,
        ListComponent,
        AdvisesComponent,
        MoreComponent,
        Error404Component,
        ContributeComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BackendTestingModule,
        RouterModule.forRoot(ROUTES, {})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
