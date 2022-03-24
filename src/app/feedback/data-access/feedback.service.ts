import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private firestore: Firestore) {}

  public saveFeedback(response: any) {
    const feedbackCollection = collection(this.firestore, 'feedback');
    return addDoc(feedbackCollection, {
      response: JSON.stringify(response),
    });
  }
}
