import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule,
  ],
  selector: 'app-error404',
  template: `
    <h1 style="font-size: 2em;">OUPS ! ERREUR 404</h1>
    <p>Il semblerait que <b>la page que vous cherchez n'est pas disponible actuellement</b>.
        Il se pourrait aussi que cette page n'existe vraiment pas. Vérifiez l'adresse de votre navigateur.</p>
    <p>Souhaitez vous réellement vous rendre ici ?</p>
    <p style="font-size: 1.5em;">{{ router_url }}</p>
  `
})
export class Error404Component {
  router_url = inject(Router).url;
}
