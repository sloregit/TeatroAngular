import { TestBed, waitForAsync } from '@angular/core/testing';
import { TeatroComponent } from './teatro.component';
import { AppComponent } from '../app.component';
import { Teatro } from '../app.component';
import { Observable } from 'rxjs';
describe('TeatroComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [TeatroComponent],
      }).compileComponents();
    })
  );
  it('è stato creato', () => {
    const fixture = TestBed.createComponent(TeatroComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
  it('', () => {
    const fixture = TestBed.createComponent(TeatroComponent);
    const app = fixture.debugElement.componentInstance;
    app.rapido = true;
    app.prenota('Simone', 'platea', 1, 1, '');
    fixture.detectChanges();
    console.log(app.prenotazione)
    expect(app.prenotazione).toEqual({
      nome: 'Simone',
      zona: 'platea',
      fila: 1,
      posto: 1,
    });
  });
});
