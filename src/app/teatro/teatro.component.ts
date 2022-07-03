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
  constructor(nome: string, zona: string, fila: number, posto: number) {
    this.nome = nome;
    this.zona = zona;
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
  @Input() rapido: boolean;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  nomeUtente: string;
  nomePosto: string;
  prenotazione: Prenotazione;
  error;
  selezionato: Function = function () {
    if (this.nomePosto === null) {
      this.selezionato === true
        ? (this.selezionato = false)
        : (this.selezionato = true);
    }
  };
  constructor() {}
  confermaPrenotazioni() {
    try {
      this.sub = this.teatro$.subscribe((teatro: Teatro) => {
        console.log(teatro[this.prenotazione.zona]);
        teatro[this.prenotazione.zona][this.prenotazione.fila][
          this.prenotazione.posto
        ] = this.prenotazione.nome;
      });
    } catch (e) {}
  }
  prenota(nomeUtente, zona, fila, posto, nomePosto) {
    this.nomePosto = nomePosto;
    if (this.nomeUtente && !nomePosto) {
      this.prenotazione = new Prenotazione(nomeUtente, zona, fila, posto);
    }
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
