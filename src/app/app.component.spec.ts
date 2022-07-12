import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
describe('Testing tests', () => {
  it('should succeed', () => expect(true).toEqual(true));
  it('should fail', () => expect(true).toEqual(false));
});
