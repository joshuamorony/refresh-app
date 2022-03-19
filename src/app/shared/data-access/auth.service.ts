import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { from, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private navCtrl: NavController) {}

  getLoggedIn() {
    return authState(this.auth);
  }

  loginWithGoogle() {
    return this.getLoggedIn().pipe(
      first(),
      switchMap((user) =>
        user
          ? of(user)
          : from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      )
    );
  }

  async logout() {
    this.navCtrl.navigateRoot('/home');
    await signOut(this.auth);
  }
}
