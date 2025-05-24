import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ projectId: "simplecrm-bf0b2", appId: "1:573165546073:web:d3d9fc5fb516e2dc1fdf48", storageBucket: "simplecrm-bf0b2.firebasestorage.app", apiKey: "AIzaSyAjgjCHR9ggH4qyqWs3NnKfExTlldDjqdQ", authDomain: "simplecrm-bf0b2.firebaseapp.com", messagingSenderId: "573165546073", measurementId: "G-4QT151H074" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
};
