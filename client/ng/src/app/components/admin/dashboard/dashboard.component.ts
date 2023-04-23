import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@servicesauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private auth: AuthService, private route: Router ) { }

  async logout() {
    const response = await this.auth.logout();
    if ( !response.ok)
    {
      console.error('unable to logout!');
    }
    return this.route.navigate(['/admin']);
  }

}
