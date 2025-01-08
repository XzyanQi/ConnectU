import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({
    "projectId":"myuas-b702e",
    "appId":"1:513320587537:web:f7daa45fde7d5b0e3ebcb0",
    "storageBucket":"myuas-b702e.firebasestorage.app",
    "apiKey":"AIzaSyB2R9nzsI-ekQAv0sATTtdLVIGqi6lSIe0",
    "authDomain":"myuas-b702e.firebaseapp.com",
    "messagingSenderId":"513320587537",
    "measurementId":"G-J33R071WDL"
  })), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
