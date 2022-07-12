import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TeatroDBService } from './teatro-db.service';
import { FakesvcService } from './fakesvc.service';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, FormsModule, BrowserModule],
        providers: [
          AppComponent,
          { provide: TeatroDBService, useClass: FakesvcService },
        ],
      }).compileComponents();
    })
  );
  it('è stato creato', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
  it('Get dati funziona come previsto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.getDati('chiave');
    app.teatro$.subscribe((teatro) => {
      expect(teatro.platea).toEqual(['Pippo', null, null]);
      expect(teatro.palco).toEqual([null, 'Paperino', null]);
    });
    expect(app.logged).toBeTruthy();
  });
});
