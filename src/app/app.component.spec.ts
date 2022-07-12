import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TeatroDBService } from './teatro-db.service';
import { GestioneComponent } from './gestione/gestione.component';
import { FakesvcService } from './fakesvc.service';
import { Observable } from 'rxjs';

describe('Testing tests', () => {
  it('Vero = vero', () => expect(true).toBeTrue());
  it('Vero = falso', () => expect(false).toBeFalse());
});

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserModule, FormsModule, HttpClientModule],
        providers: [
          AppComponent,
          { provide: TeatroDBService, useClass: FakesvcService },
        ],
      }).compileComponents();
    })
  );
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
  it('should contain string teatro'),
    () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.getPrenotazioni$('chiave');
      expect(app.teatro$).toEqual(
        new Observable((subscriber) =>
          subscriber.next({
            platea: ['Pippo', undefined, undefined],
            palco: [undefined, 'Paperino', undefined],
          })
        )
      );
    };
});

/*
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });

  it(`should have as title 'Temperature in Angular 11'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Temperature in Angular 11');
  });

  it("l'oggetto selezione dovrebbe essere indefinita", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.selezione).toBeUndefined();
  });

  it("l'array cities dovrebbe contenere la stringa inserita con addCity", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.addCity('Verona');
    expect(app.cities).toContain('Verona');
  });
});*/
