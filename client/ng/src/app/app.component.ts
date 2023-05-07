import { Component } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { MenuComponent } from '@components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    MenuComponent,
    RouterModule,
    HttpClientModule,
  ]
})
export class AppComponent{
  title = environment.app.title;
  emailHref = `mailto:${environment.supportEmail}`;

  getCurrentYear(): number {
    const now = new Date();
    return now.getFullYear();
  }
}
