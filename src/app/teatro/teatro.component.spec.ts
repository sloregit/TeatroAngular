import { TestBed, waitForAsync } from '@angular/core/testing';
import { TeatroComponent } from './teatro.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [TeatroComponent],
      }).compileComponents();
    })
  );
  it('should create the app', () => {
    const fixture = TestBed.createComponent(TeatroComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
