import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { ClientsService } from '../../data-access/clients.service';
import { Client, ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailPage implements OnInit {
  client$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.clientsStore.clients$.pipe(
        map((clients) =>
          clients
            ? clients.find((client) => client.id === params.get('id'))
            : null
        )
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private clientsStore: ClientsStore,
    public clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }

  deleteClient(client: Client) {
    this.clientsService.removeClient(client.id);
    this.navCtrl.navigateBack('/clients');
  }
}
