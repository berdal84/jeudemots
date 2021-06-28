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
import { PrivateComponent } from './components/private/private.component';
import { LoginComponent } from './components/login/login.component';
import { AppGuard } from './app.guard';


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
    PrivateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })
  ],
  providers: [AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
