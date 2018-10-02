import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {  HTTP_INTERCEPTORS , HttpClientModule,} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NounService } from './noun.service';
import { NojqueryComponent } from './nojquery.component'
import { AppRoutingModule }     from './app-routing.module';

import { FaderComponent } from './fader.component';

import {AngularMaterialModule} from './angular-material.module';

import { UserService } from './user.service';

import { RegisterComponent } from './register.component';

import { LoginComponent } from './login.component';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    AppComponent,
    FaderComponent,
    NojqueryComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule


  ],
  providers: [
    AuthGuard,
    NounService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    ErrorInterceptorProvider,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
