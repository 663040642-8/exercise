import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Pokemon, PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent {
  private pokemonService = inject(PokemonService);
  pokemons$ = this.pokemonService.getPokemons();
}


