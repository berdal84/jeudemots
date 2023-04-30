import { Component } from '@angular/core';

@Component({
  selector: 'app-advises',
  styles: [`
    #quote {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
    }
    #quote > #text {
      flex: 3;
    }
    #quote > #author {
      flex: 1;
      padding: 0 5rem;
    }
  `],
  template: `
      <h3>Quelques conseils pour réussir vos blagues comme un pro :</h3>
      <ol class="indent">
          <li>Soyez vous-même.</li><br>
          <li>Ne craignez pas la moquerie.</li><br>
          <li>N'abandonnez pas au premier échec.</li><br>
      </ol>
      <h3>Conseil "Spécial"</h3>
      <div class="indent">
        <p id="quote">
          <cite id="text">"Oublie que t'as aucune chance, vas-y fonce. On sait jamais, sur un mal entendu ça peut marcher."</cite>
          <span id="author">Jean-Claude Dusse</span>
        </p>
      </div>
  `
})
export class AdvisesComponent {}
