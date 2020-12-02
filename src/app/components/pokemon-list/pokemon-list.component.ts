import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemon: Pokemon[] = [];
  types = [];
  limit = 10;
  page = 1;
  typeSearch: any;
  offset = 0;
  public loading = true;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemon(this.limit, this.offset);
    this.getTypes();
  }

  onPageChange(page: number) {
    this.offset = (page - 1) * 20;
    this.getPokemon(this.limit, this.offset);
  }

  getPokemon(page, offset) {
    const thisItem = this;
    this.loading = true;
    this.pokemonService.getPokemonList(page, offset).subscribe(
      data => {
        this.pokemon = data.results;
        setTimeout(() => {
          thisItem.loading = false;

        }, 500);
      }
    );
  }

  getTypes() {
    this.pokemonService.getPokemonTypes().subscribe(
      data => {
        data.results.forEach(el => {
          this.types.push(el.name);
        });
      }
    );
  }

  searchByType() {
    const thisItem = this;
    this.pokemon = [];
    this.loading = true;
    this.pokemonService.getPokemonByTypes(this.typeSearch, this.limit).subscribe(
      data => {
        data.pokemon.forEach(el => {
          this.pokemon.push(el.pokemon);
        });

        setTimeout(() => {
          thisItem.loading = false;

        }, 500);
      }
    );
  }
}
