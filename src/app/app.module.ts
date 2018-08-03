import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NounService } from './noun.service';
import { NojqueryComponent } from './nojquery.component'
import { AppRoutingModule }     from './app-routing.module';

import { FaderComponent } from './fader.component';

import {AngularMaterialModule} from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    FaderComponent,
    NojqueryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,

  ],
  providers: [
    NounService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
