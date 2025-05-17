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
  private limitOffset$ = new BehaviorSubject<{ limit: number; offset: number }>({ limit: 151, offset: 0 });
  pokemons$ = this.limitOffset$.pipe(
    switchMap(({ limit, offset }) => this.pokemonService.getPokemons(limit, offset))
  );

  page = 1;

  constructor(private pokemonService: PokemonService) {}

  selectGeneration(gen: string) {
    switch(gen) {
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
}


