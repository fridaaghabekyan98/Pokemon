import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public static GET_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';
  public static GET_POKEMON_TYPES = 'https://pokeapi.co/api/v2/type/';

  constructor(private http: HttpClient) {
  }

  getPokemonList(limit, offset): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Observable((observer: Observer<any>) => {
      this.http.get(PokemonService.GET_POKEMON + '?limit=' + limit + '&offset=' + offset, {headers})
        .subscribe(res => {
            observer.next(res);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  getPokemonTypes(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Observable((observer: Observer<any>) => {
      this.http.get(PokemonService.GET_POKEMON_TYPES, {headers})
        .subscribe(res => {
            observer.next(res);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  getPokemonByTypes(type, limit): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Observable((observer: Observer<any>) => {
      this.http.get(PokemonService.GET_POKEMON_TYPES + /*'?limit=' + limit + '/' +*/ type, {headers})
        .subscribe(res => {
            observer.next(res);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  get(id: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Observable((observer: Observer<any>) => {
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + id + '/', {headers})
        .subscribe(res => {
            observer.next(res);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }
}
