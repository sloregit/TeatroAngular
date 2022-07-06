import { Component, OnInit } from '@angular/core';
import { Observable, of, map, Subscription } from 'rxjs';
import { Teatro } from '../app.component';
import { TeatroDBService } from '../teatro-db.service';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  teatro: Teatro;
  filePlateaMax: Array<string>;
  postiPlateaMax: Array<string>;
  filePalchiMax: Array<string>;
  postiPalchiMax: Array<string>;
  sub: Subscription;
  key: string;
  newKey: string;
  conferma: string;
  constructor(private TeatroDBservice: TeatroDBService) {
    this.filePlateaMax = new Array(7);
    this.postiPlateaMax = new Array(10);
    this.filePalchiMax = new Array(6);
    this.postiPalchiMax = new Array(4);
  }
  nuovaChiave() {
    this.TeatroDBservice.getNewKey$().subscribe(
      (chiave: string) => (this.newKey = chiave)
    );
  }
  aggiungiTeatro(filePlatea, postiPlatea, filePalco, postipalco) {
    this.teatro = new Teatro();
    this.teatro.platea = Array(filePlatea * 1)
      .fill('fila')
      .map(() =>
        Array(postiPlatea * 1)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
    this.teatro.palco = Array(filePalco * 1)
      .fill('fila')
      .map(() =>
        Array(postipalco * 1)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
    this.TeatroDBservice.SetPrenotazioni$(
      this.key,
      JSON.stringify(this.teatro)
    ).subscribe({
      next: (conf) =>
        (this.conferma = conf + 'Teatro aggiunto, Chiave: ' + this.key),
      error: (err) => console.error('Errore in SetPrenotazioni$: ' + err),
    });
  }
  ngOnInit() {}
}
