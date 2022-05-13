import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/frontend/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private user: UserService, private route: Router ) { }

  ngOnInit(): void {
  }

  async logout() {
    const response = await this.user.logout();
    if( response.status === 'failure' )
    {
      console.error('unable to logout!');
    }
    this.route.navigate(['/admin']);
  }

}
