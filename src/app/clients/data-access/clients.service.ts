import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, filter, retryWhen, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/data-access/auth.service';
import { ClientShellModule } from '../feature/client-shell/client-shell.module';
import { Client } from './clients.store';

@Injectable({
  providedIn: ClientShellModule,
})
export class ClientsService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  public getClients() {
    const clientsCollection = collection(this.firestore, 'clients');
    return collectionData(clientsCollection, { idField: 'id' }).pipe(
      // Emit null before erroring to clear client data in store, then rethrow error
      catchError((err) => concat(of(null), throwError(err))),
      // Restart stream when user logs back in
      retryWhen((errors) =>
        errors.pipe(
          switchMap(() =>
            this.authService.getLoggedIn().pipe(filter((user) => !!user))
          )
        )
      )
    ) as Observable<Client[]>;
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
