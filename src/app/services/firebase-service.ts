import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  

  firebaseConfig = {
    apiKey: "AIzaSyAs-Ng4OHrHvjeLA1W3Z7Btl2ho4YHdXIA",
    authDomain: "feed-reader-5e320.firebaseapp.com",
    projectId: "feed-reader-5e320",
    storageBucket: "feed-reader-5e320.firebasestorage.app",
    messagingSenderId: "211840088399",
    appId: "1:211840088399:web:c832cef1b9e3a5a48ced3a"
  };

  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
  }
}
