import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeStore } from '../data-access/home.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(private homeStore: HomeStore) {}

  login() {
    this.homeStore.login();
  }
}
