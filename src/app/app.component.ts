import { Component, VERSION } from '@angular/core';
import { Observable, of, map, Subscription } from 'rxjs';
import { TeatroDBService } from './teatro-db.service';

export class Teatro {
  platea;
  palco;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  teatro$: Observable<Teatro>;
  chiaveUtente: string;
  logged: boolean;
  sub: Subscription;
  constructor(private TeatroDBService: TeatroDBService) {}
  indietro() {
    this.logged = false;
    this.teatro$ = undefined;
  }
  getDati(chiave: string) {
    this.chiaveUtente = chiave;
    this.sub = this.TeatroDBService
      .getPrenotazioni$
      //this.chiaveUtente
      ()
      .subscribe({
        next: (res: string) => {
          console.log('ok getDati');
          this.teatro$ = of(JSON.parse(res));
          this.logged = true;
        },
        error: (e) =>
          console.error('Observer got an error: ' + JSON.stringify(e)),
      });
  }
}
