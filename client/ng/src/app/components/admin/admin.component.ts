import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
    <h2>Administration</h2>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {}