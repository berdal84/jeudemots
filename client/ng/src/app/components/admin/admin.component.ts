import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@components/backend/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
    <div class="menu">
        <a [routerLink]="['install']">Installer</a>
        <a [routerLink]="['uninstall']">Désinstaller</a>
        <a [routerLink]="['backup']">Sauvegarder</a>
        <a [routerLink]="['restore']">Restaurer</a>
        <a href (click)="logout()">Se déconnecter</a>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .menu a {
      margin: 10px;
    }
  `]
})
export class AdminComponent {

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
