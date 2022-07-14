import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/app.routes';
import { JokeFilterPipe } from 'src/app/pipes/jokefilter.pipe';
import { AdvisesComponent } from '../advises/advises.component';
import { ContributeComponent } from '../contribute/contribute.component';
import { Error404Component } from '../error404/error404.component';
import { HomeComponent } from '../home/home.component';
import { ListComponent } from '../list/list.component';
import { MoreComponent } from '../more/more.component';
import { TodayComponent } from '../today/today.component';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        HomeComponent,
        TodayComponent,
        ListComponent,
        AdvisesComponent,
        MoreComponent,
        Error404Component,
        JokeFilterPipe,
        ContributeComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })
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
