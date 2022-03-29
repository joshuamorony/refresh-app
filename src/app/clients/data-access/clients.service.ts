import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, filter, retryWhen, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/data-access/auth.service';
import { Client } from './clients.store';

@Injectable({
  providedIn: 'root',
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

  public removeClient(id: string) {
    const clientDocReference = doc(this.firestore, `clients/${id}`);
    return deleteDoc(clientDocReference);
  }

  public saveSurvey(response: any, id: string) {
    const clientDocReference = doc(this.firestore, `clients/${id}`);
    return updateDoc(clientDocReference, {
      survey: arrayUnion(JSON.stringify(response)),
    });
  }
}
