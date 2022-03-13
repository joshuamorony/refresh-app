import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import * as AngularFireFirestore from '@angular/fire/firestore';

jest.mock('@angular/fire/firestore');

describe('ClientsService', () => {
  let service: ClientsService;
  let firestore: AngularFireFirestore.Firestore;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ClientsService, AngularFireFirestore.Firestore],
    });
    service = TestBed.inject(ClientsService);

    service = TestBed.inject(ClientsService);
    firestore = TestBed.inject(AngularFireFirestore.Firestore);
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
        .mockReturnValue(mockDocumentData as any);

      const result = service.getClients();
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
      expect(result).toBe(mockDocumentData);
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
});
