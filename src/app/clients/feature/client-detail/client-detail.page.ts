import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
    public clientsService: ClientsService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }

  async deleteClient(client: Client) {
    const alert = await this.alertCtrl.create({
      header: 'Delete client?',
      message: 'This will permanently delete this clients data',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary cancel',
        },
        {
          text: 'Delete',
          cssClass: 'danger confirm',
          id: 'confirm-delete',
          handler: () => {
            this.navCtrl.navigateBack('/clients');
            this.clientsService.removeClient(client.id);
          },
        },
      ],
    });

    await alert.present();
  }
}
