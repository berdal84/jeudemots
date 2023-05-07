import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@components/backend/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private auth = inject(AuthService);
  private route = inject(Router);

  async logout() {
    const response = await this.auth.logout();
    if ( !response.ok)
    {
      console.error('unable to logout!');
    }
    return this.route.navigate(['/admin']);
  }

}
