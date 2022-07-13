import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() rapido: boolean;
  @Output() rapidoChange = new EventEmitter<boolean>();
  @Output() chiaveUtenteEmitter = new EventEmitter<string>();
  chiaveUtente: string;
  constructor() {}
  accedi(rapido: boolean) {
    this.rapido = rapido;
    this.chiaveUtenteEmitter.emit(this.chiaveUtente);
    this.rapidoChange.emit(this.rapido);
  }
}
