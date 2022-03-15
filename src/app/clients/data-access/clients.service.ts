import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
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
    return collectionData(clientsCollection, { idField: 'id' }) as Observable<
      Client[]
    >;
  }

  public addClient(
    details: Pick<Client, 'name' | 'email' | 'phone' | 'notes'>
  ) {
    const clientsCollection = collection(this.firestore, 'clients');
    addDoc(clientsCollection, details);
  }

  public updateClient(client: Partial<Client> & { id: string }) {
    const clientDocReference = doc(this.firestore, `clients/${client.id}`);
    const { id, ...clientWithoutId } = client;
    return setDoc(clientDocReference, clientWithoutId, { merge: true });
  }
}
