import { Injectable } from '@angular/core';
import { Observable, of, map, Subscription, Subscriber } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable()
export class FakesvcService {
  constructor(private http: HttpClient) {}
  public getPrenotazioni$(key: string): Observable<string> {
    return new Observable((subscriber) => {
      subscriber.next(
        JSON.stringify({
          platea: ['Pippo', undefined, undefined],
          palco: [undefined, 'Paperino', undefined],
        })
      );
      subscriber.complete();
    });
  }
  public SetPrenotazioni$(key: string, teatro: string): Observable<string> {
    if (typeof key == 'string' && typeof teatro == 'string') {
      return new Observable((subscriber) => {
        subscriber.next('ok SetPrenotazioni$');
        subscriber.complete();
      });
    }
  }
  public getNewKey$(): Observable<string> {
    return new Observable((subscriber) => {
      subscriber.next('ok getNewKey$');
      subscriber.complete();
    });
  }
}
