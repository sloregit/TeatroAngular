import { Component, OnInit } from '@angular/core';
import { Observable, of, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  filePlateaMax;
  postiPlateaMax;
  filePalchiMax;
  postiPalchiMax;
  elemPlatea: Array<number>;
  elemPalco: Array<number>;
  filePlatea: number;
  postiPlatea: number;
  filePalco: number;
  postiPalco: number;
  showNomi: boolean;
  sub: Subscription;
  constructor() {
    this.filePlateaMax = new Array(7);
    this.postiPlateaMax = new Array(10);
    this.filePalchiMax = new Array(6);
    this.postiPalchiMax = new Array(4);
  }

  ngOnInit() {}
}
