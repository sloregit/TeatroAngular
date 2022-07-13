import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teatro } from './classi-comuni';

@Injectable()
export class TeatroDBService {
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  constructor(private http: HttpClient) {}
  public getPrenotazioni$(key: string): Observable<string> {
    return this.http.get<string>(this.URL + 'get?key=' + key);
  }
  public SetPrenotazioni$(key: string, teatro: string): Observable<string> {
    return this.http.post<string>(this.URL + 'set?key=' + key, teatro);
  }
  public getNewKey$(): Observable<string> {
    return this.http.get<string>(this.URL + 'new?secret=ssw2022');
  }
}

@Injectable()
export class GeneraTeatro {
  teatro: Teatro;
  constructor() {}
  public impostaTeatro(
    filePlatea: number,
    postiPlatea: number,
    filePalco: number,
    postipalco: number
  ) {
    this.teatro = new Teatro();
    this.teatro.platea = Array(filePlatea)
      .fill('fila')
      .map(() =>
        Array(postiPlatea)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
    this.teatro.palco = Array(filePalco)
      .fill('fila')
      .map(() =>
        Array(postipalco)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
    return this.teatro;
  }
}
