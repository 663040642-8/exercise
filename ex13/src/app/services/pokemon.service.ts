import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  getPokemons(limit = 151, offset = 0): Observable<Pokemon[]> {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonListResponse>(apiUrl).pipe(
      switchMap(response => {
        const requests = response.results.map(p => this.http.get<Pokemon>(p.url));
        return forkJoin(requests);
      })
    );
  }
  getPokemonById(id: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: { name: string };
  }[];
}

