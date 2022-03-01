import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

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
}
