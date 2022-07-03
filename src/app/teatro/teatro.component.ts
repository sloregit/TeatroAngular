import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TeatroDBService } from '../teatro-db.service';

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
  @Output() prenotazioneEmitter = new EventEmitter();
  sub: Subscription;
  @Input() rapido: boolean;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  nomeUtente: string;
  nomePosto: string;
  prenotazione: Prenotazione;
  error;
  constructor(private TeatroDBService: TeatroDBService) {}
  confermaPrenotazioni() {
    try {
      if (this.prenotazione) {
        this.prenotazioneEmitter.emit(this.prenotazione);
      }
    } catch (e) {}
  }
  prenotaRapido(nomeUtente, zona, fila, posto, nomePosto) {
    try {
      this.nomePosto = nomePosto;
    } catch (e) {}
  }
  prenota(nomeUtente, zona, fila, posto, nomePosto) {
    try {
      this.nomePosto = nomePosto;
      if (this.nomeUtente && !nomePosto) {
        this.prenotazione = new Prenotazione(nomeUtente, zona, fila, posto);
        if (this.rapido) {
          this.prenotazioneEmitter.emit(this.prenotazione);
        }
      }
    } catch (e) {}
  }
  ngOnInit() {
    console.log(this.rapido);
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      this.platea = teatro.platea;
      this.palco = teatro.palco;
    });
  }
}
