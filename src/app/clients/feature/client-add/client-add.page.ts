import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { ClientsService } from '../../data-access/clients.service';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.page.html',
  styleUrls: ['./client-add.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddPage {
  client$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.clientsStore.clients$.pipe(
        map((clients) =>
          params.get('id')
            ? clients.find((client) => client.id === params.get('id'))
            : null
        )
      )
    )
  );

  clientForm$ = this.client$.pipe(
    map((client) =>
      this.fb.group({
        name: this.fb.group({
          first: [client?.name?.first ?? ''],
          last: [client?.name?.last ?? ''],
        }),
        phone: [client?.phone ?? ''],
        email: [client?.email ?? ''],
        notes: [client?.notes ?? ''],
      })
    )
  );

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private clientsService: ClientsService,
    private clientsStore: ClientsStore,
    private route: ActivatedRoute
  ) {}

  saveClient(values) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.clientsService.updateClient({
        id,
        ...values,
      });
    } else {
      this.clientsService.addClient(values);
    }

    this.navCtrl.navigateBack('clients');
  }
}
