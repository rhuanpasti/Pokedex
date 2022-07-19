import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {


  constructor(public http:HttpClient) { }

public getPokemons(){
  return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`);
} 
public getPokeInfo(name:string){
  return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

}

}
