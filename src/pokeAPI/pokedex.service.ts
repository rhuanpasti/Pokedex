import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  PokemonListResponse,
  Pokemon,
  PokemonDisplay,
  PokemonListItem
} from '../app/model/pokemon.types';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly defaultLimit = 20;

  constructor(private http: HttpClient) { }

  public getPokemons(offset: number = 0, limit: number = this.defaultLimit): Observable<PokemonListResponse> {
    const url = `${this.baseUrl}/pokemon/?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  public getPokeInfo(identifier: string | number): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${identifier}`;

    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError)
    );
  }

  public getPokemonListForDisplay(offset: number = 0, limit: number = this.defaultLimit): Observable<PokemonDisplay[]> {
    return this.getPokemons(offset, limit).pipe(
      map(response => response.results.map(pokemon => this.transformToDisplayFormat(pokemon)))
    );
  }

  public searchPokemon(identifier: string | number): Observable<PokemonDisplay> {
    return this.getPokeInfo(identifier).pipe(
      map(pokemon => this.transformPokemonToDisplay(pokemon))
    );
  }

  private transformToDisplayFormat(pokemon: PokemonListItem): PokemonDisplay {
    const id = this.extractIdFromUrl(pokemon.url);
    const imageUrl = this.getPokemonImageUrl(id);

    return {
      id,
      name: pokemon.name,
      imageUrl,
      types: [],
      weight: 0,
      height: 0,
      abilities: [],
      stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        specialAttack: 0,
        specialDefense: 0
      }
    };
  }

  private transformPokemonToDisplay(pokemon: Pokemon): PokemonDisplay {
    const imageUrl = pokemon.sprites.front_default || this.getPokemonImageUrl(pokemon.id);

    return {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl,
      types: pokemon.types.map(type => type.type.name),
      weight: pokemon.weight / 10, // Convert to kg
      height: pokemon.height / 10, // Convert to meters
      abilities: pokemon.abilities.map(ability => ability.ability.name),
      stats: {
        hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
        specialAttack: pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0
      }
    };
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  private getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching Pokemon data';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

