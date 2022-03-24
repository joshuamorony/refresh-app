import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { first, switchMap, tap } from 'rxjs/operators';
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

export interface ClientsState {
  clients: Client[];
}

export interface Feedback {
  id: string;
  response: string;
}

@Injectable({
  providedIn: ClientShellModule,
})
export class ClientsStore extends ComponentStore<ClientsState> {
  readonly clients$ = this.select((state) => state.clients);

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

  constructor(private clientsService: ClientsService) {
    super({ clients: null });
  }
}
