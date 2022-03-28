import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { first, switchMap, tap } from 'rxjs/operators';
import { FeedbackService } from '../../shared/data-access/feedback.service';
import { ClientShellModule } from '../feature/client-shell/client-shell.module';
import { ClientsService } from './clients.service';

interface ClientName {
  first: string;
  last: string;
}

interface SurveyResponse {
  values: string;
}

export interface Client {
  id?: string;
  name: ClientName;
  email: string;
  phone: string;
  appointments: string[];
  notes: string;
  survey: SurveyResponse[];
}

export interface Feedback {
  id: string;
  timestamp: string;
  response: string;
}

export interface ClientsState {
  clients: Client[];
  feedbacks: Feedback[];
}

@Injectable({
  providedIn: ClientShellModule,
})
export class ClientsStore extends ComponentStore<ClientsState> {
  readonly clients$ = this.select((state) => state.clients);
  readonly feedbacks$ = this.select((state) => state.feedbacks);

  loadClients = this.effect(($) =>
    $.pipe(
      first(),
      switchMap(() =>
        this.clientsService.getClients().pipe(
          tap({
            next: (clients) => this.patchState({ clients }),
          })
        )
      )
    )
  );

  loadFeedbacks = this.effect(($) =>
    $.pipe(
      first(),
      switchMap(() =>
        this.feedbackService.getFeedbacks().pipe(
          tap({
            next: (feedbacks) => this.patchState({ feedbacks }),
          })
        )
      )
    )
  );

  constructor(
    private clientsService: ClientsService,
    private feedbackService: FeedbackService
  ) {
    super({ clients: null, feedbacks: null });
  }
}
