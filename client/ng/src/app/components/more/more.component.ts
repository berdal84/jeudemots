import {Component} from '@angular/core';

@Component({
  selector: 'app-more',
  template: `
    <h3>A propos...</h3>
    <section class="indent">
      <p>Ce site a été créé pour me former. Dans un premier temps il n'était qu'une simple page AngularJS, il a
          depuis beaucoup évolué (avec un backend et une base de données).</p>
      <p>L'objectif secondaire est évidemment de s'amuser en écrivant les jeux de mots...</p>
      <p>Point de vue technique, ce site a été créé initialement avec AngularJS 1.x., puis il a été mis à jour
          vers Angular v2 (passage en typescript) jusqu'à la v15 dernièrement.
          (<a href="https://github.com/berdal84/jeudemots" title="Consultez le code source sur GitHub">voir
              code source</a>).
      </p>
    </section>
  `
})
export class MoreComponent {}
