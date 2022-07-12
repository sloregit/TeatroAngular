import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FakesvcService } from '../fakesvc.service';
import { TeatroDBService } from '../teatro-db.service';
import { GestioneComponent } from './gestione.component';

describe('GestioneComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          GestioneComponent,
          { provide: TeatroDBService, useClass: FakesvcService },
        ],
      }).compileComponents();
    })
  );
  it('should create the app', () => {
    const fixture = TestBed.createComponent(GestioneComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
