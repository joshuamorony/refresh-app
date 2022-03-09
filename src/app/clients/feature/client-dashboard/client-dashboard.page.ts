import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardPage implements OnInit {
  constructor(public clientsStore: ClientsStore) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }
}
