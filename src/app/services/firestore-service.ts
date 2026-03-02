import { inject, Injectable } from '@angular/core';
import { Feed } from '../model/feed';
import { FirebaseService } from './firebase-service';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {


  firebase = inject(FirebaseService);
  db = getFirestore(this.firebase.app);
  authServ = inject(AuthService);

  userFeeds: Feed[] = [];

  addFeed(newFeed: Feed) {
    if (this.authServ.auth.currentUser) {
      this.userFeeds.push(newFeed);
      const userRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid)
      return setDoc(userRef, { feeds: this.userFeeds }, { merge: true });
    }
    return Promise.reject('user not authenticated')
  }

  getUserFeeds() {
     if (this.authServ.auth.currentUser) {
      const userRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid)
      return getDoc(userRef)
      .then(result=> {
      //console.log(result.data())
      this.userFeeds = result.data()! ['feeds'];
      return this.userFeeds
    });
    }
    return Promise.reject('User not authenticated');
  }
}


