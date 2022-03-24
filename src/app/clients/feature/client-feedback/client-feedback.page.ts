import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.page.html',
  styleUrls: ['./client-feedback.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFeedbackPage implements OnInit {
  constructor(private clientsStore: ClientsStore) {}

  ngOnInit() {
    this.clientsStore.loadFeedbacks();
  }
}
