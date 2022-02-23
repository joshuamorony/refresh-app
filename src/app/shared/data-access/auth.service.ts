import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  getLoggedIn() {
    return authState(this.auth).pipe(filter((user) => !!user));
  }

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
