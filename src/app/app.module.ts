import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { TodayComponent } from './components/today/today.component';
import { ListComponent } from './components/list/list.component';
import { AdvisesComponent } from './components/advises/advises.component';
import { MoreComponent } from './components/more/more.component';
import { ContributeComponent } from './components/contribute/contribute.component';
import { Error404Component } from './components/error404/error404.component';
import { JokeFilterPipe } from './pipes/jokefilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AppGuard } from './app.guard';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TodayComponent,
    ListComponent,
    AdvisesComponent,
    MoreComponent,
    Error404Component,
    JokeFilterPipe,
    ContributeComponent,
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    RouterModule.forRoot(
      ROUTES, {
        enableTracing: !environment.production,
        useHash: true
      })
  ],
  providers: [AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
