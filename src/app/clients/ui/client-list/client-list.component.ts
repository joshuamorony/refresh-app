import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  @Input() clients: Client[];

  constructor() {}
}
