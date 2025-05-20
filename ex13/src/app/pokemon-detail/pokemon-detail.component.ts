import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonData: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.loading = true;
    this.pokemonService.getPokemonById(id).subscribe({
      next: data => {
        this.pokemonData = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  goNext() {
    if (this.loading) return; 
    this.router.navigate([this.pokemonId + 1]);
  }

  goPrev() {
    if (this.loading) return;
    if (this.pokemonId > 1) {
      this.router.navigate([this.pokemonId - 1]);
    }
  }
}
