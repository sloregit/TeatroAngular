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
  @Input() conferma: string;
  sub: Subscription;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  nomeUtente: string;
  prenotazione: Prenotazione;
  prenotato: boolean;
  error: string;
  constructor() {}
  confermaPrenotazioni() {
    try {
      if (!this.prenotazione) throw 'Prenotazione fallita';
      this.prenotazioneEmitter.emit(this.prenotazione);
    } catch (e) {
      this.error =
        e + ': per prenotare devi inserire un nome e selezionare un posto';
    }
  }
  prenota(
    nomeUtente: string,
    zona: string,
    fila: number,
    posto: number,
    nomePosto: string
  ) {
    try {
      this.error = undefined;
      this.conferma = undefined;
      if (nomePosto) throw 'Posto già prenotato da: ' + nomePosto;
      if (!nomeUtente) throw 'Inserisci un nome';
      if (this.prenotato) throw 'Prenotazione già effettuata, torna indietro';
      if (this.nomeUtente) {
        this.prenotazione = new Prenotazione(nomeUtente, zona, fila, posto);
        if (this.rapido && !this.prenotato) {
          this.prenotazioneEmitter.emit(this.prenotazione);
          this.prenotato = true;
        }
      }
    } catch (e) {
      this.error = e;
    }
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe({
      next: (teatro: Teatro) => {
        this.platea = teatro.platea;
        this.palco = teatro.palco;
      },
      error: (err: Error) =>
        console.error('Errore in TeatroComponent onInit: ' + err),
    });
  }
}
