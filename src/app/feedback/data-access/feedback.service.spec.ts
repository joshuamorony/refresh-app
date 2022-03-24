import { TestBed } from '@angular/core/testing';
import * as AngularFireFirestore from '@angular/fire/firestore';

import { FeedbackService } from './feedback.service';

jest.mock('@angular/fire/firestore');

describe('FeedbackService', () => {
  let service: FeedbackService;
  let firestore: AngularFireFirestore.Firestore;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [FeedbackService, AngularFireFirestore.Firestore],
    });
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saveFeedback should create a new document in the feedback collection using the supplied data ', () => {
    const mockCollectionReference = jest.fn();

    const testFeedback = {
      test: 'value',
    };

    jest
      .spyOn(AngularFireFirestore, 'collection')
      .mockReturnValue(mockCollectionReference as any);

    jest.spyOn(AngularFireFirestore, 'addDoc');

    service.saveFeedback(testFeedback);

    expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
      {},
      'feedback'
    );
    expect(AngularFireFirestore.addDoc).toHaveBeenCalledWith(
      mockCollectionReference,
      {
        response: JSON.stringify(testFeedback),
      }
    );
  });
});
