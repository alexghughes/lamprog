import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TestInterceptor } from './_guards/test.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptorProvider } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FaderComponent,
    NojqueryComponent,
    RegisterComponent,
    LoginComponent

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
    AuthGuard,
    NounService,
    TestInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    ErrorInterceptorProvider,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
