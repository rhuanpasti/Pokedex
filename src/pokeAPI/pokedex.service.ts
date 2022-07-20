import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomePage } from '../app/home/home.page';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  

  constructor(public http: HttpClient) { }

  //função para obter o nome do pokemon e a url para seus dados específicos
  public getPokemons(offset) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`);
  }
  

  // Função que retorna os detalhes específicos do pokemon.
  public getPokeInfo(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }
}

