import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, filter, retryWhen, switchMap } from 'rxjs/operators';
import { Feedback } from '../../clients/data-access/clients.store';
import { AuthService } from '../../shared/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  public saveFeedback(response: any) {
    const feedbackCollection = collection(this.firestore, 'feedback');
    return addDoc(feedbackCollection, {
      response: JSON.stringify(response),
    });
  }

  public getFeedbacks() {
    const feedbackCollection = collection(this.firestore, 'feedback');
    return collectionData(feedbackCollection, { idField: 'id' }).pipe(
      // Emit null before erroring to clear feedback data in store, then rethrow error
      catchError((err) => concat(of(null), throwError(err))),
      // Restart stream when user logs back in
      retryWhen((errors) =>
        errors.pipe(
          switchMap(() =>
            this.authService.getLoggedIn().pipe(filter((user) => !!user))
          )
        )
      )
    ) as Observable<Feedback[]>;
  }
}
