import { Component, HostListener } from '@angular/core';
import { PokedexService } from '../../pokeAPI/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public PokedexService: PokedexService) {}
  public listapokemon = new Array<any>();

  mostrarPokemons() {
    this.PokedexService.getPokemons()
    .subscribe((resposta: any)=> {
        resposta.results.forEach(result => {
          this.PokedexService.getPokeInfo(result.name)
          .subscribe((resposta: any)=>{
          this.listapokemon.push(resposta);
          console.log(this.listapokemon);
        });
        });
    })
  }
  
  mostrar: boolean = false;

  public pokepropierties: Array<any> = [];

  mostramodal(pokename) {
    this.mostrar = !this.mostrar;
    this.pokepropierties = pokename;
    console.log(this.pokepropierties);
    return this.pokepropierties;
  }

  escondemodal() {
    this.mostrar = !this.mostrar;
  }
  ionViewDidEnter() {
    this.mostrarPokemons();
  }
  
  scrolled = 0;

  


}