import { Component, HostListener } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { PokedexService } from '../../pokeAPI/pokedex.service';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public PokedexService: PokedexService) { }
  public listapokemon = new Array<any>();

  public mostrarTodosOsPokemons() {
    this.PokedexService.getPokemons()
      .subscribe((resposta: any) => {
        resposta.results.forEach(result => {
          this.PokedexService.getPokeInfo(result.name)
            .subscribe((resposta: any) => {
              this.listapokemon = [];
              this.listapokemon.push(resposta);
            });
        });
      })
  }

  mostrarPesquisa(pesquisa) {
    this.PokedexService.procuraPokemon(pesquisa)
      .subscribe((resposta: any) => {
        resposta.results.forEach(result => {
          this.PokedexService.getPokeInfo(result.pesquisa)
            .subscribe((resposta: any) => {
              this.listapokemon = [];
              this.listapokemon.push(resposta);
            });
        });
      })
  }

  mostrar: boolean = false;

  public pokepropierties: Array<any> = [];

  mostramodal(pokename) {
    this.mostrar = !this.mostrar;
    this.pokepropierties = pokename;
    //console.log(this.pokepropierties);
    return this.pokepropierties;
  }

  escondemodal() {
    this.mostrar = !this.mostrar;
  }

  ionViewDidEnter() {
    this.mostrarTodosOsPokemons();
  }

  public funcaoPesquisa(e) {
    const textoBusca = e?.target?.value?.toLowerCase();
    const buscaVazia = (!textoBusca) || textoBusca.length === 0 || (textoBusca.trim() == '');
    console.log("função pesquisa",textoBusca);
    if (buscaVazia){
      console.log("Resetando Pagina");
      this.mostrarTodosOsPokemons()
      return;
    }
    this.PokedexService.procuraPokemon(textoBusca).subscribe(resultado => {
      this.listapokemon = [resultado];
    }, err => {
      this.listapokemon = [];
    });
  }
}