import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

export class Pulsante {
  pulsante;
  prenota;
  constructor(nome) {}
}
export class Prenotazione {
  zona: string;
  nome: string;
  fila: number;
  posto: number;
  constructor(zona: string, nome: string, fila: number, posto: number) {
    this.zona = zona;
    this.nome = nome;
    this.fila = fila;
    this.posto = posto;
  }
}

export class Selezione {
  selezionati;
  constructor() {}
  aggiungi(prenotazione: Prenotazione) {
    this.selezionati.push(prenotazione);
  }
  rimuovi(fila: number, posto: number) {
    this.selezionati.map((old, i) => {
      if (old.fila === fila && old.posto === posto) {
        this.selezionati.splice(i, 1);
      }
    });
  }
}

@Component({
  selector: 'app-teatro',
  templateUrl: './teatro.component.html',
  styleUrls: ['./teatro.component.css'],
})
export class TeatroComponent implements OnInit {
  @Input() teatro$;
  sub: Subscription;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  nomeUtente: string;
  constructor() {}
  prenota(nome, fila, posto) {
    console.log(this.platea);
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      this.platea = teatro.platea;
      this.palco = teatro.palco;
      this.platea.map((fila) => fila.map((posto) => new Pulsante(posto)));
    });
  }
}
