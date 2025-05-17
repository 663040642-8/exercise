import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule,
    RouterLink
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonData: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.pokemonId = id;
        this.loadPokemon(id);
      }
    });
  }

  loadPokemon(id: number): void {
    this.pokemonService.getPokemonById(id).subscribe(data => {
      this.pokemonData = data;
    });
  }
}
