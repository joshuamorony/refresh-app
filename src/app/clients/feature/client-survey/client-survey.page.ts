import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-survey',
  templateUrl: './client-survey.page.html',
  styleUrls: ['./client-survey.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSurveyPage implements OnInit {
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
    private clientsStore: ClientsStore
  ) {}

  ngOnInit() {
    this.clientsStore.loadClients();
  }
}
