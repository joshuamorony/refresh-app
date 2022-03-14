import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage {
  client$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.clientsStore.clients$.pipe(
        map((clients) =>
          clients.find((client) => client.id === params.get('id'))
        )
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private clientsStore: ClientsStore
  ) {}
}
