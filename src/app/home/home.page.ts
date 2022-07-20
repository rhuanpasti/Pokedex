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
  
  public listaPoke = new Array<ListaPokemons>();
  mostrar: boolean = false;
  public detalhesPokemon: Array<any> = [];
  offset=0;

//Faz com que a tela sempre seja carregada com a lista de pokemons ao iniciar.
  ionViewDidEnter() {
    this.mostrarTodosOsPokemons(this.offset);
  }
  
//Faz a requisição para a api e monta a tela com os pokemons obtidos.
  public mostrarTodosOsPokemons(offset) {
    this.PokedexService.getPokemons(this.offset)
      .subscribe((resposta: any) => {
        resposta.results.forEach( pokemon => {
            const partesUrl = (''+pokemon.url).split('/');
            const idPokemon = partesUrl[partesUrl.length-2];
            const urlImagemDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
            this.listaPoke.push({ Nome: pokemon.name, Id: idPokemon, Url: urlImagemDefault });
            });
        });
      }
  
   mostramodal(pokemon: ListaPokemons) {
    this.mostrar = !this.mostrar;
   
  //Metodo que busca os dados detalhados do pokemon
    this.PokedexService.getPokeInfo(pokemon.Nome).subscribe(
      (resultado: any) => {
        this.detalhesPokemon = resultado;
      },
      (erro) => {
        alert('Falha ao capturar detalhes do pokemon')
      }
    );
  }

  escondeModal() {
    this.mostrar = !this.mostrar;
  }

  funcaoProximaPagina(){
    this.offset = this.offset+10;
    this.listaPoke = [];
    this.mostrarTodosOsPokemons(this.offset);
  }

  funcaoPaginaAnterior(){
    this.offset = this.offset-10;
    if(this.offset <= -1 ){
    this.offset=0;
    alert("Você já está na primeira página.")
    return
    }
    this.listaPoke = [];
    this.mostrarTodosOsPokemons(this.offset);
  }

 // Função para executar a pesquisa pelo nome e ID do pokemon.
  public funcaoPesquisa(e) {
    const textoBusca = e?.target?.value?.toLowerCase();    
    const buscaVazia = (!textoBusca) || textoBusca?.length === 0 || (textoBusca?.trim() == '');

    if (buscaVazia) {
      this.listaPoke = [];
      this.mostrarTodosOsPokemons(this.offset);
      return;
    }

    this.PokedexService.getPokeInfo(textoBusca).subscribe(
      (resultado: any) => {                
        const urlImagemDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resultado.id}.png`;
        this.listaPoke = [ { Nome: resultado.name, Id : resultado.id, Url: urlImagemDefault } ]
      },
      (erro) => {
        this.listaPoke = [];
      }
    );
  }
}