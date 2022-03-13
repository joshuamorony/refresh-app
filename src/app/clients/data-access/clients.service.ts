import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from './clients.store';
import { ClientShellModule } from '../feature/client-shell/client-shell.module';

@Injectable({
  providedIn: ClientShellModule,
})
export class ClientsService {
  constructor(private firestore: Firestore) {}

  public getClients() {
    const clientsCollection = collection(this.firestore, 'clients');
    return collectionData(clientsCollection) as Observable<Client[]>;
  }

  public addClient(details) {}
}
