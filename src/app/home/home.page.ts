import { Component } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginWithGoogle();
  }
}
