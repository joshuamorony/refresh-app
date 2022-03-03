import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
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
export class ClientsStore extends ComponentStore<ClientsState> {}
