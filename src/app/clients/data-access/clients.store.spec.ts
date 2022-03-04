import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ClientsStore } from './clients.store';

describe('ClientsStore', () => {
  let service: ClientsStore;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ClientsStore],
    });

    service = TestBed.inject(ClientsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selector: clients$', () => {
    it('should return empty array by default', () => {
      const observerSpy = subscribeSpyTo(service.clients$);
      expect(observerSpy.getFirstValue()).toEqual([]);
    });
  });

  describe('effect: loadClients()', () => {
    it('should update clients state with stream from getClients()', () => {});
  });
});
