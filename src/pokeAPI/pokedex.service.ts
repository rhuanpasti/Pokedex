import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {


  constructor(public http: HttpClient) { }

  public getPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`);
  }
  public getPokeInfo(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }
  public procuraPokemon(pesquisa){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pesquisa}`).pipe(
      map(listapokemon => {
        listapokemon['image'] = this.getPokeInfo(listapokemon['id']);
        listapokemon['pokeIndex'] = listapokemon['id'];
        return listapokemon;
      })
    );
  }
}
