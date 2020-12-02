import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon = new Pokemon();

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.pokemonService.get(id).subscribe(
      data => {
        const pokemon = new Pokemon();
        pokemon.name = data.name;
        pokemon.id = data.id;
        pokemon.weight = data.weight;
        pokemon.height = data.height;
        pokemon.order = data.order;
        pokemon.base_experience = data.base_experience;
        data.types.forEach((eachType) => {
          pokemon.types.push(eachType.type.name);
        });

        data.stats.forEach((eachStat) => {
          pokemon.stats.push({
            name: eachStat.stat.name,
            value: eachStat.base_stat
          });
        });

        this.pokemon = pokemon;
      }
    );
  }

}
