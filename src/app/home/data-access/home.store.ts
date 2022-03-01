import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/data-access/auth.service';

export interface HomeState {
  loginStatus: 'pending' | 'authenticating' | 'success' | 'error';
}

const defaultState: HomeState = {
  loginStatus: 'pending',
};

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  loginStatus$ = this.select((state) => state.loginStatus);

  login = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.setState({ loginStatus: 'authenticating' });
      }),
      exhaustMap(() =>
        this.authService.loginWithGoogle().pipe(
          tap({
            next: () => {
              this.setState({ loginStatus: 'success' });
              this.navCtrl.navigateForward('/clients');
            },
            error: () => this.setState({ loginStatus: 'error' }),
          })
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    super(defaultState);
  }
}
