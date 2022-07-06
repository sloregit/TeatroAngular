import { Component, OnInit } from '@angular/core';
import { Observable, of, map, Subscription } from 'rxjs';
import { Teatro } from '../app.component';
import { TeatroDBService } from '../teatro-db.service';

export class GestoreTeatro {
  teatro: Teatro;
  constructor() {
    this.teatro = new Teatro();
  }
  aggiungiTeatro(filePlatea, postiPlatea, filePalco, postipalco) {
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
  }
}

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  gestore: GestoreTeatro;
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
  //genera una nuova chiave
  nuovaChiave() {
    this.TeatroDBservice.getNewKey$().subscribe(
      (chiave: string) => (this.newKey = chiave)
    );
  }
  //Genera un nuovo teatro e lo inserisce in corrispondenza della chiave;
  aggiungiTeatro(filePlatea, postiPlatea, filePalco, postipalco) {
    this.gestore = new GestoreTeatro();
    this.gestore.aggiungiTeatro(filePlatea, postiPlatea, filePalco, postipalco);
    this.TeatroDBservice.SetPrenotazioni$(
      this.key,
      JSON.stringify(this.gestore.teatro)
    ).subscribe({
      next: (conf) =>
        (this.conferma = conf + ': Teatro aggiunto, Chiave: ' + this.key),
      error: (err) => console.error('Errore in SetPrenotazioni$: ' + err),
    });
  }
  ngOnInit() {}
}
