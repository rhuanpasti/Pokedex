import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { PokedexService } from '../../pokeAPI/pokedex.service';
import { PokemonDisplay, SearchEvent } from '../model/pokemon.types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly pageSize = 20;

  public pokemonList: PokemonDisplay[] = [];
  public selectedPokemon: PokemonDisplay | null = null;
  public isModalOpen = false;
  public isLoading = false;
  public currentOffset = 0;
  public hasNextPage = true;
  public hasPreviousPage = false;
  public searchQuery = '';
  public Math = Math; // Make Math available in template

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionViewDidEnter(): void {
    if (this.pokemonList.length === 0) {
      this.loadPokemonList();
    }
  }

  public loadPokemonList(): void {
    this.setLoading(true);

    this.pokedexService
      .getPokemonListForDisplay(this.currentOffset, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (pokemonList: PokemonDisplay[]) => {
          this.pokemonList = pokemonList;
          this.updatePaginationState();
        },
        error: (error) => {
          console.error('Error loading Pokemon list:', error);
          this.pokemonList = [];
        },
      });
  }

  public openPokemonModal(pokemon: PokemonDisplay): void {
    this.setLoading(true);

    this.pokedexService
      .searchPokemon(pokemon.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (detailedPokemon: PokemonDisplay) => {
          this.selectedPokemon = detailedPokemon;
          this.isModalOpen = true;
        },
        error: (error) => {
          console.error('Error loading Pokemon details:', error);
          this.selectedPokemon = pokemon;
          this.isModalOpen = true;
        },
      });
  }

  public closePokemonModal(): void {
    this.isModalOpen = false;
    this.selectedPokemon = null;
  }

  public goToNextPage(): void {
    if (this.hasNextPage) {
      this.currentOffset += this.pageSize;
      this.loadPokemonList();
    }
  }

  public goToPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.currentOffset = Math.max(0, this.currentOffset - this.pageSize);
      this.loadPokemonList();
    }
  }

  public searchPokemon(event: any): void {
    const searchTerm = event?.target?.value?.trim().toLowerCase() || '';
    this.searchQuery = searchTerm;

    if (!searchTerm) {
      this.loadPokemonList();
      return;
    }

    this.setLoading(true);

    this.pokedexService
      .searchPokemon(searchTerm)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (pokemon: PokemonDisplay) => {
          this.pokemonList = [pokemon];
          this.currentOffset = 0;
          this.updatePaginationState();
        },
        error: (error) => {
          console.error('Error searching Pokemon:', error);
          this.pokemonList = [];
          this.updatePaginationState();
        },
      });
  }

  public clearSearch(): void {
    this.searchQuery = '';
    this.currentOffset = 0;
    this.loadPokemonList();
  }

  private updatePaginationState(): void {
    this.hasPreviousPage = this.currentOffset > 0;
    this.hasNextPage =
      this.pokemonList.length === this.pageSize && !this.searchQuery;
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return typeColors[type.toLowerCase()] || '#A8A878';
  }

  public formatPokemonId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }
}
