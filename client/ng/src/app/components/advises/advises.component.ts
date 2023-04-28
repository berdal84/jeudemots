import { Component } from '@angular/core';

@Component({
  selector: 'app-advises',
  template: `
      <h3>Quelques conseils pour réussir vos blagues comme un pro :</h3>
      <ol class="indent">
          <li>Soyez vous-même.</li><br>
          <li>Ne craignez pas la moquerie.</li><br>
          <li>N'abandonnez pas au premier échec.</li><br>
      </ol>
      <h3>Conseil spécial de M. DUSS:</h3>
      <p class="indent">"Oublie que t'as aucune chance, vas-y fonce. Sur un mal entendu ça peut marcher."
          (<a href="https://www.youtube.com/watch?v=rIktiASrDFo">référence</a>)</p>
      <br>
  `
})
export class AdvisesComponent {}
