import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule,
    RouterLink, NgxPaginationModule
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})

export class PokedexComponent {
  selectedGeneration: string = 'I';
  page = 1;
  private limitOffset$ = new BehaviorSubject<{ limit: number; offset: number }>({ limit: 151, offset: 0 });
  pokemons$ = this.limitOffset$.pipe(
    switchMap(({ limit, offset }) => this.pokemonService.getPokemons(limit, offset))
  );

  constructor(private pokemonService: PokemonService) { }

  selectGeneration(gen: string) {
    this.selectedGeneration = gen;

    switch (gen) {
      case 'I':
        this.limitOffset$.next({ limit: 151, offset: 0 });
        break;
      case 'II':
        this.limitOffset$.next({ limit: 100, offset: 151 });
        break;
      case 'III':
        this.limitOffset$.next({ limit: 135, offset: 251 });
        break;
      case 'IV':
        this.limitOffset$.next({ limit: 107, offset: 386 });
        break;
      case 'V':
        this.limitOffset$.next({ limit: 156, offset: 493 });
        break;
      case 'VI':
        this.limitOffset$.next({ limit: 72, offset: 649 });
        break;
      case 'VII':
        this.limitOffset$.next({ limit: 88, offset: 721 });
        break;
      case 'VIII':
        this.limitOffset$.next({ limit: 96, offset: 809 });
        break;
      case 'IX':
        this.limitOffset$.next({ limit: 120, offset: 905 });
        break;
      default:
        this.limitOffset$.next({ limit: 151, offset: 0 });
    }

    this.page = 1;
  }

  getCardBgClass(type: string): string {
    const typeToClassMap: { [key: string]: string } = {
      fire: 'bg-red-500',
      water: 'bg-blue-400',
      grass: 'bg-green-400',
      electric: 'bg-yellow-300',
      psychic: 'bg-pink-400',
      ice: 'bg-cyan-200',
      dragon: 'bg-purple-600',
      dark: 'bg-gray-700',
      fairy: 'bg-pink-200',
      normal: 'bg-gray-200',
      fighting: 'bg-orange-600',
      flying: 'bg-indigo-300',
      poison: 'bg-purple-400',
      ground: 'bg-yellow-600',
      rock: 'bg-yellow-800',
      bug: 'bg-lime-500',
      ghost: 'bg-indigo-700',
      steel: 'bg-gray-400'
    };

    return typeToClassMap[type] || 'bg-gray-100';
  }

  onPageChange(page: number) {
  this.page = page;

  window.scrollTo({ top: 0, behavior: 'auto' });
}

}




