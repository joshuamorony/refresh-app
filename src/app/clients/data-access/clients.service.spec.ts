import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import * as AngularFireFirestore from '@angular/fire/firestore';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of, Subject, throwError, iif } from 'rxjs';
import { AuthService } from '../../shared/data-access/auth.service';

jest.mock('@angular/fire/firestore');
jest.mock('../../shared/data-access/auth.service');

describe('ClientsService', () => {
  let service: ClientsService;
  let firestore: AngularFireFirestore.Firestore;
  let authService: AuthService;

  let mockAuthState$: Subject<boolean>;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    mockAuthState$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        ClientsService,
        AngularFireFirestore.Firestore,
        {
          provide: AuthService,
          useValue: {
            getLoggedIn: jest.fn().mockReturnValue(mockAuthState$),
          },
        },
      ],
    });
    service = TestBed.inject(ClientsService);

    service = TestBed.inject(ClientsService);
    firestore = TestBed.inject(AngularFireFirestore.Firestore);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getClients()', () => {
    it('should return an observable of the clients collection from firestore', () => {
      const mockCollectionReference = jest.fn();
      const mockDocumentData = jest.fn();

      jest
        .spyOn(AngularFireFirestore, 'collection')
        .mockReturnValue(mockCollectionReference as any);

      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(of(mockDocumentData) as any);

      const observerSpy = subscribeSpyTo(service.getClients());
      const options = {
        idField: 'id',
      };

      expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
        {},
        'clients'
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

      const observerSpy = subscribeSpyTo(service.getClients());

      expect(observerSpy.getLastValue()).toBe(null);
    });

    it('should restart stream after error if user logs in', () => {
      let shouldError = true;
      const testValue = [];

      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(iif(() => shouldError, throwError(''), of(testValue)));

      const observerSpy = subscribeSpyTo(service.getClients());

      shouldError = false;
      mockAuthState$.next(true);

      expect(observerSpy.getLastValue()).toBe(testValue);
    });
  });

  describe('addClient()', () => {
    it('should create a new document in the clients collection using the supplied data', () => {
      const mockCollectionReference = jest.fn();

      const testClient = {
        name: {
          first: 'Josh',
          last: 'Morony',
        },
        email: 'joshua.morony@gmail.com',
        phone: '444',
        notes: '',
      };

      jest
        .spyOn(AngularFireFirestore, 'collection')
        .mockReturnValue(mockCollectionReference as any);

      jest.spyOn(AngularFireFirestore, 'addDoc');

      service.addClient(testClient);

      expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
        {},
        'clients'
      );
      expect(AngularFireFirestore.addDoc).toHaveBeenCalledWith(
        mockCollectionReference,
        testClient
      );
    });
  });

  describe('updateClient()', () => {
    it('should update the client document in Firestore with the supplied values', () => {
      const mockDocumentReference = jest.fn();

      const updatedClient = {
        id: '123',
        name: {
          first: 'Josh',
          last: 'Morony',
        },
        email: 'joshua.morony@gmail.com',
        phone: '444',
        notes: '',
      };

      const { id, ...updatedClientWithoutId } = updatedClient;

      jest
        .spyOn(AngularFireFirestore, 'doc')
        .mockReturnValue(mockDocumentReference as any);

      jest.spyOn(AngularFireFirestore, 'setDoc');

      service.updateClient(updatedClient);

      expect(AngularFireFirestore.doc).toHaveBeenCalledWith(
        {},
        `clients/${updatedClient.id}`
      );
      expect(AngularFireFirestore.setDoc).toHaveBeenCalledWith(
        mockDocumentReference,
        updatedClientWithoutId,
        { merge: true }
      );
    });
  });
});
