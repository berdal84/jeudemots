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


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TodayComponent,
    ListComponent,
    AdvisesComponent,
    MoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
