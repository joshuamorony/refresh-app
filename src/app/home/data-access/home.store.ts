import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';
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
  login = this.effect(($) =>
    $.pipe(
      tap(() => {
        console.info('here');
        this.setState({ loginStatus: 'authenticating' });
      }),
      exhaustMap(async () =>
        of(await this.authService.loginWithGoogle()).pipe(
          tap((user) => {
            console.info('here2');
            this.setState({ loginStatus: 'success' });
          })
        )
      )
    )
  );

  constructor(private authService: AuthService) {
    super(defaultState);
  }
}
