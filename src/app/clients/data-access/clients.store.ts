import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';
import { ClientShellModule } from '../feature/client-shell/client-shell.module';

interface ClientName {
  first: string;
  last: string;
}

interface SurveyResponse {
  values: string;
}

export interface Client {
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

@Injectable({
  providedIn: ClientShellModule,
})
export class ClientsStore extends ComponentStore<ClientsState> {
  readonly clients$ = this.select((state) => state.clients);

  loadClients = this.effect(($) => $);

  constructor() {
    super({ clients: [] });
  }
}
