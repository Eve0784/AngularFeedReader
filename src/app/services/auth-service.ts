import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  firebaseServ = inject(FirebaseService);
  auth = getAuth(this.firebaseServ.app);
  isAuth = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuth.set(true);
      } else {
        this.isAuth.set(false);
      }
    });
  }

  loginWithMailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
   return signOut(this.auth);

  }

}
