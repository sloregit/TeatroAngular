import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [LoginComponent],
      }).compileComponents();
    })
  );
  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
