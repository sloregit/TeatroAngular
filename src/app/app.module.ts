import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TeatroDBService } from './teatro-db.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeatroComponent } from './teatro/teatro.component';
import { GestioneComponent } from './gestione/gestione.component';
import { FakesvcService } from './fakesvc.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    LoginComponent,
    TeatroComponent,
    GestioneComponent,
  ],
  bootstrap: [AppComponent],
  providers: [TeatroDBService, FakesvcService, HttpClient],
})
export class AppModule {}
