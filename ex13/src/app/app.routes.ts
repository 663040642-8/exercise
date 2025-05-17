import { Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
    {path: '', component: PokedexComponent},
    { path: ':id', component: PokemonDetailComponent},
];
