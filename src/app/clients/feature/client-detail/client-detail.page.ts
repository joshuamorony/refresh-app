import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { ClientsStore } from '../../data-access/clients.store';

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
            : clients
        )
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private clientsStore: ClientsStore
  ) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }
}
