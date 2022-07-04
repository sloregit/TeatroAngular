import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

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

@Component({
  selector: 'app-teatro',
  templateUrl: './teatro.component.html',
  styleUrls: ['./teatro.component.css'],
})
export class TeatroComponent implements OnInit {
  @Input() teatro$: Observable<Teatro>;
  @Input() rapido: boolean;
  @Output() prenotazioneEmitter = new EventEmitter<Prenotazione>();
  sub: Subscription;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  nomeUtente: string;
  nomePosto: string;
  prenotazione: Prenotazione;
  prenotato: boolean;
  error;
  constructor() {}
  confermaPrenotazioni() {
    try {
      if (this.prenotazione) {
        this.prenotazioneEmitter.emit(this.prenotazione);
      }
    } catch (e) {}
  }
  prenota(
    nomeUtente: string,
    zona: string,
    fila: number,
    posto: number,
    nomePosto: string
  ) {
    try {
      this.nomePosto = nomePosto;
      if (this.nomeUtente && !nomePosto) {
        this.prenotazione = new Prenotazione(nomeUtente, zona, fila, posto);
        if (this.rapido && !this.prenotato) {
          this.prenotazioneEmitter.emit(this.prenotazione);
          this.prenotato = true;
        }
      }
    } catch (e) {}
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe({
      next: (teatro: Teatro) => {
        console.log(teatro);
        this.platea = teatro.platea;
        this.palco = teatro.palco;
      },
      error: (err: Error) =>
        console.error('Errore in TeatroComponent onInit: ' + err),
    });
  }
}
