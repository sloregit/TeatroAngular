import { TestBed, waitForAsync } from '@angular/core/testing';
import { GestioneComponent } from './gestione.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [GestioneComponent],
      }).compileComponents();
    })
  );
  it('should create the app', () => {
    const fixture = TestBed.createComponent(GestioneComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
