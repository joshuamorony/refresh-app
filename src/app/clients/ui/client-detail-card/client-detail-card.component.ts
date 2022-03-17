import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-detail-card',
  templateUrl: './client-detail-card.component.html',
  styleUrls: ['./client-detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailCardComponent {
  @Input() client: Client;

  constructor() {}
}
