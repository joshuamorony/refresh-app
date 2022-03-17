import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ClientsStore } from './clients.store';
import { ClientsService } from './clients.service';
import { of } from 'rxjs';

jest.mock('./clients.service');

describe('ClientsStore', () => {
  let service: ClientsStore;
  let clientsService: ClientsService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    (ClientsService as jest.Mock).mockImplementation(() => ({
      getClients: jest.fn().mockReturnValue(of([])),
    }));

    TestBed.configureTestingModule({
      providers: [ClientsStore, ClientsService],
    });

    service = TestBed.inject(ClientsStore);
    clientsService = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selector: clients$', () => {
    it('should return null by default', () => {
      const observerSpy = subscribeSpyTo(service.clients$);
      expect(observerSpy.getFirstValue()).toEqual(null);
    });
  });

  describe('effect: loadClients()', () => {
    it('should update clients state with stream from getClients()', () => {
      const testValue = ['123'];

      jest
        .spyOn(clientsService, 'getClients')
        .mockReturnValue(of(testValue as any));

      const observerSpy = subscribeSpyTo(service.clients$);

      service.loadClients();

      expect(observerSpy.getLastValue()).toBe(testValue);
    });

    it('should only trigger getClients() once', () => {
      service.loadClients();
      service.loadClients();

      expect(clientsService.getClients).toHaveBeenCalledTimes(1);
    });
  });
});
