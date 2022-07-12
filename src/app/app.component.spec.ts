import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TeatroDBService } from './teatro-db.service';

describe('Testing tests', () => {
  it('Vero = vero', () => expect(true).toBeTrue());
  it('Vero = falso', () => expect(true).toBeFalse());
});
/*
describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [AppComponent],
      }).compileComponents();
    })
  );

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
