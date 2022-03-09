import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListPage implements OnInit {
  constructor(public clientsStore: ClientsStore) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }
}
