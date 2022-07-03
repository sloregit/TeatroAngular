import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

export class zona {
  zona;
  constructor(zona) {
    this.zona = zona;
  }
}
@Component({
  selector: 'app-teatro',
  templateUrl: './teatro.component.html',
  styleUrls: ['./teatro.component.css'],
})
export class TeatroComponent implements OnInit {
  @Input() teatro$;
  sub: Subscription;
  platea: zona;
  palco: zona;
  nomeUtente: string;
  constructor() {}
  prenota(zona) {
    console.log(zona);
  }
  ngOnInit() {
    this.sub = this.teatro$.subscribe((teatro: Teatro) => {
      this.platea = new zona(teatro.platea);
      this.palco = new zona(teatro.palco);
    });
  }
}
