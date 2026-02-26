import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {


  firebaseConfig = {
  apiKey: "AIzaSyDWLLFJWOt6rsaWc_zYRjhGDy8RmzHbA2M",
  authDomain: "feed-reader-56f2d.firebaseapp.com",
  projectId: "feed-reader-56f2d",
  storageBucket: "feed-reader-56f2d.firebasestorage.app",
  messagingSenderId: "252825040713",
  appId: "1:252825040713:web:485c44eee55ef839730c98"
};

  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
  }


}
