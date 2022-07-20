import { Component, HostListener } from '@angular/core';
import { PokedexService } from '../../pokeAPI/pokedex.service';
import { retry, catchError } from 'rxjs/operators';
import { ListaPokemons } from '../model/lista-pokemons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public PokedexService: PokedexService) { }
  
  public listapokemon = new Array<ListaPokemons>();
  mostrar: boolean = false;
  public detalhespokemon: Array<any> = [];

  ionViewDidEnter() {
    this.mostrarTodosOsPokemons();
  }

  public mostrarTodosOsPokemons() {
    this.PokedexService.getPokemons()
      .subscribe((resposta: any) => {
        resposta.results.forEach( pokemon => {
            const partesUrl = (''+pokemon.url).split('/');
            const idPokemon = partesUrl[partesUrl.length-2];
            const urlImagemDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
            this.listapokemon.push({ Nome: pokemon.name, Id: idPokemon, Url: urlImagemDefault });
            });
        });
      }
  

   mostramodal(pokemon: ListaPokemons) {
    this.mostrar = !this.mostrar;
   
    
    this.PokedexService.getPokeInfo(pokemon.Nome).subscribe(
      (resultado: any) => {
        this.detalhespokemon = resultado;
      },
      (erro) => {
        alert('Falha ao capturar detalhes do pokemon')
      }
    );
  }

  escondemodal() {
    this.mostrar = !this.mostrar;
  }

  

 
  public funcaoPesquisa(e) {
    const textoBusca = e?.target?.value?.toLowerCase();    
    const buscaVazia = (!textoBusca) || textoBusca?.length === 0 || (textoBusca?.trim() == '');

    if (buscaVazia) {
      this.listapokemon = [];
      this.mostrarTodosOsPokemons();
      return;
    }

    this.PokedexService.getPokeInfo(textoBusca).subscribe(
      (resultado: any) => {                
        const urlImagemDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resultado.id}.png`;
        this.listapokemon = [ { Nome: resultado.name, Id : resultado.id, Url: urlImagemDefault } ]
      },
      (erro) => {
        this.listapokemon = [];
      }
    );
  }
}