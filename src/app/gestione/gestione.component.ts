import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teatro } from '../classi-comuni';
import { TeatroDBService, GeneraTeatro } from '../teatro-db.service';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  newTeatro: Teatro;
  filePlateaMax: Array<string>;
  postiPlateaMax: Array<string>;
  filePalchiMax: Array<string>;
  postiPalchiMax: Array<string>;
  sub: Subscription;
  key: string;
  newKey: string;
  conferma: string;
  error: string;
  constructor(
    private TeatroDBservice: TeatroDBService,
    private genera: GeneraTeatro
  ) {
    this.filePlateaMax = new Array(7);
    this.postiPlateaMax = new Array(10);
    this.filePalchiMax = new Array(6);
    this.postiPalchiMax = new Array(4);
  }
  //genera una nuova chiave
  nuovaChiave() {
    this.sub = this.TeatroDBservice.getNewKey$().subscribe({
      next: (chiave: string) => (this.newKey = chiave),
      error: (err) => {
        (this.error = 'Errore in nuovaChiave:' + err),
          console.error(this.error);
      },
      complete: () => this.sub.unsubscribe(),
    });
  }
  //Genera un nuovo teatro e lo inserisce in corrispondenza della chiave;
  //Utilizza GeneraTeatro (in TeatroDBService) per creare il teatro
  //(nel Template) +string per trasformare la stringa in numero

  aggiungiTeatro(
    filePlatea: number,
    postiPlatea: number,
    filePalco: number,
    postiPalco: number
  ) {
    try {
      if (!this.key) throw 'Inserisci una chiave';
      if (!filePlatea || !postiPlatea || !filePalco || !postiPalco)
        throw 'Devi prima completare la configurazione dei posti';
      this.newTeatro = this.genera.impostaTeatro(
        filePlatea,
        postiPlatea,
        filePalco,
        postiPalco
      );
    } catch (e) {
      this.error = e;
    }
    if (this.newTeatro) {
      this.sub = this.TeatroDBservice.SetPrenotazioni$(
        this.key,
        JSON.stringify(this.newTeatro)
      ).subscribe({
        next: (conf) =>
          (this.conferma = conf + ': Teatro aggiunto, Chiave: ' + this.key),
        error: (err) => {
          (this.error = 'Errore in SetPrenotazioni$: ' + err),
            console.error(this.error);
        },
        complete: () => this.sub.unsubscribe(),
      });
    }
  }
  ngOnInit() {}
}
