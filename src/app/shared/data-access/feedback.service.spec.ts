import { TestBed } from '@angular/core/testing';
import * as AngularFireFirestore from '@angular/fire/firestore';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { iif, of, Subject, throwError } from 'rxjs';

import { FeedbackService } from './feedback.service';
import { AuthService } from '../../shared/data-access/auth.service';

jest.mock('@angular/fire/firestore');
jest.mock('../../shared/data-access/auth.service');

describe('FeedbackService', () => {
  let service: FeedbackService;
  let firestore: AngularFireFirestore.Firestore;
  let authService: AuthService;

  let mockAuthState$: Subject<boolean>;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    mockAuthState$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        AngularFireFirestore.Firestore,
        {
          provide: AuthService,
          useValue: {
            getLoggedIn: jest.fn().mockReturnValue(mockAuthState$),
          },
        },
      ],
    });
    service = TestBed.inject(FeedbackService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saveFeedback should create a new document in the feedback collection using the supplied data ', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2020-01-01').getTime());

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
        timestamp: Date.now().toString(),
        response: JSON.stringify(testFeedback),
      }
    );
  });

  describe('getFeedbacks()', () => {
    it('should return an observable of the feedbacks collection from firestore', () => {
      const mockCollectionReference = jest.fn();
      const mockDocumentData = jest.fn();

      jest
        .spyOn(AngularFireFirestore, 'collection')
        .mockReturnValue(mockCollectionReference as any);

      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(of(mockDocumentData) as any);

      const observerSpy = subscribeSpyTo(service.getFeedbacks());
      const options = {
        idField: 'id',
      };

      expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
        {},
        'feedback'
      );
      expect(AngularFireFirestore.collectionData).toHaveBeenCalledWith(
        mockCollectionReference,
        options
      );
      expect(observerSpy.getLastValue()).toBe(mockDocumentData);
    });

    it('should emit null if collectionData errors', () => {
      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(throwError(''));

      const observerSpy = subscribeSpyTo(service.getFeedbacks());

      expect(observerSpy.getLastValue()).toBe(null);
    });

    it('should restart stream after error if user logs in', () => {
      let shouldError = true;
      const testValue = [];

      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(iif(() => shouldError, throwError(''), of(testValue)));

      const observerSpy = subscribeSpyTo(service.getFeedbacks());

      shouldError = false;
      mockAuthState$.next(true);

      expect(observerSpy.getLastValue()).toBe(testValue);
    });
  });
});
