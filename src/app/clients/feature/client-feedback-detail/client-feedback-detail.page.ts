import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ClientsStore } from '../../data-access/clients.store';

@Component({
  selector: 'app-client-feedback-detail',
  templateUrl: './client-feedback-detail.page.html',
  styleUrls: ['./client-feedback-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFeedbackDetailPage implements OnInit {
  feedback$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.clientsStore.feedbacks$.pipe(
        map((feedbacks) =>
          feedbacks
            ? feedbacks.find((feedback) => feedback.id === params.get('id'))
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
    this.clientsStore.loadFeedbacks();
  }
}
