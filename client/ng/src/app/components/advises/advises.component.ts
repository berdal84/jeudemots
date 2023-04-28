import { Component } from '@angular/core';

@Component({
  selector: 'app-advises',
  template: `
      <h3>Quelques conseils pour réussir vos blagues comme un pro :</h3>
      <ol class="indent">
          <li>Soyez vous-même.</li><br>
          <li>Ne craignez pas la moquerie.</li><br>
          <li>N'abandonnez pas au premier échec.</li><br>
          <li>Ne vous précipitez pas, mieux vaut pas de jeu de mots qu'un jeu de mots hors contexte.</li><br>
          <li>Ressentez la force qui est en vous.</li><br>
          <li>Mangez 5 fruits et légumes par jour.</li><br>
          <li>Faites du sport.</li><br>
          <li>Ayez des rapports sexuels réguliers (très important pour le "lâcher-prise").</li><br>
      </ol>
      <h3>Conseil spécial de M. DUSS:</h3>
      <p class="indent">"Oublie que t'as aucune chance, vas-y fonce. Sur un mal entendu ça peut marcher."
          (<a href="https://www.youtube.com/watch?v=rIktiASrDFo">référence</a>)</p>
      <br>
  `
})
export class AdvisesComponent {}
