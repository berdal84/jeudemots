import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private user: UserService, private route: Router ) { }

  async logout() {
    const response = await this.user.logout();
    if ( !response.ok)
    {
      console.error('unable to logout!');
    }
    return this.route.navigate(['/admin']);
  }

}
