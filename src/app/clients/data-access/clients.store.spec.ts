import { TestBed } from '@angular/core/testing';
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
    it('should return empty array by default', () => {});
  });
});
