import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

export class Pulsante {
  nome;
  fila;
  posto;
  constructor(nome, fila, posto) {
    this.nome = nome;
    this.fila = fila;
    this.posto = posto;
  }
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
  platea;
  palco: Array<Array<string>>;
  nomeUtente: string;
  nomePosto: string;
  selezionato: Function = function () {
    if (this.nomePosto === null) {
      this.selezionato === true
        ? (this.selezionato = false)
        : (this.selezionato = true);
    }
  };
  constructor() {}

  prenota(nomeUtente, nomePosto, fila, posto) {
    this.nomePosto = nomePosto;
    console.log(nomeUtente, fila, posto);
  }
  mostraNome(nome) {
    nome !== null ? (this.nomePosto = nome) : (this.nomePosto = undefined);
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      this.platea = teatro.platea;
      this.palco = teatro.palco;
      console.log(this.platea);
    });
  }
}
