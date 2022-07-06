import { Component } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { TeatroDBService } from './teatro-db.service';
import { Prenotazione } from './teatro/teatro.component';

export class Teatro {
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Chiavi utilizzate: 0ef3f513,1752a852
  teatro$: Observable<Teatro>;
  teatroOut: string;
  chiaveUtente: string;
  logged: boolean;
  sub: Subscription;
  rapido: boolean;
  conferma: string;
  admin: boolean;
  constructor(private TeatroDBService: TeatroDBService) {}
  //resetta i valori per tornare alla schermata iniziale
  indietro() {
    this.logged = false;
    this.teatro$ = undefined;
    this.admin = false;
    this.conferma = undefined;
  }
  //aggiunge la nuova prenotazione al teatro e invia tutto
  aggiornaPrenotazioni(prenotazione: Prenotazione) {
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      teatro[prenotazione.zona][prenotazione.fila][prenotazione.posto] =
        prenotazione.nome;
      this.teatroOut = JSON.stringify(teatro);
    });
    this.TeatroDBService.SetPrenotazioni$(
      this.chiaveUtente,
      this.teatroOut
    ).subscribe({
      next: (conf: string) =>
        (this.conferma =
          conf +
          ': ' +
          prenotazione.nome +
          ' ha prenotato il posto ' +
          'P' +
          prenotazione.fila +
          prenotazione.posto +
          ' in ' +
          prenotazione.zona),
      error: (err: string) =>
        console.error('Errore in aggiornaPrenotazioni: ' + err),
    });
  }
  //Preleva i dati
  getDati(chiave: string) {
    this.chiaveUtente = chiave;
    this.sub = this.TeatroDBService.getPrenotazioni$(
      //this.chiaveUtente
      this.chiaveUtente
    ).subscribe({
      next: (res: string) => {
        this.teatro$ = of(JSON.parse(res));
        this.logged = true;
      },
      error: (err: string) => console.error('Errore in getDati: ' + err),
    });
  }
}
