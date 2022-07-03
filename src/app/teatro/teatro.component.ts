import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

export class Pulsante {
  pulsante;
  prenota;
  constructor(nome) {}
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
    console.log(nome, fila, posto);
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      this.platea = teatro.platea;
      this.palco = teatro.palco;
      this.platea.map((fila) => fila.map((posto) => new Pulsante(posto)));
    });
  }
}
