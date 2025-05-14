import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { DragopultComponent } from './pages/dragopult/dragopult.component';
import { GardevoirComponent } from './pages/gardevoir/gardevoir.component';
import { GengarComponent } from './pages/gengar/gengar.component';
import { GroudonComponent } from './pages/groudon/groudon.component';
import { SalamenceComponent } from './pages/salamence/salamence.component';
import { CharizardComponent } from './pages/charizard/charizard.component';

export const routes: Routes = [
    { path: '', component: PokemonListComponent },
    { path: 'dragopult', component: DragopultComponent },
    { path: 'gardevoir', component: GardevoirComponent },
    { path: 'gengar', component: GengarComponent },
    { path: 'groudon', component: GroudonComponent },
    { path: 'salamence', component: SalamenceComponent },
    { path: 'charizard', component: CharizardComponent },
];
