export class Pokemon {
  name: string;
  id: number;
  types = [];
  stats = [];
  weight: string;
  height: string;
  order: string;
  base_experience: string;

  image() {
     if (this.id) {
      return 'https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/' + this.id + '.png';
    }
  }
}
