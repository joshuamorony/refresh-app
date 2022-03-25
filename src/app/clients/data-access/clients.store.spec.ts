import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ClientsStore } from './clients.store';
import { ClientsService } from './clients.service';
import { of } from 'rxjs';
import { FeedbackService } from '../../feedback/data-access/feedback.service';

jest.mock('./clients.service');
jest.mock('../../feedback/data-access/feedback.service');

describe('ClientsStore', () => {
  let service: ClientsStore;
  let clientsService: ClientsService;
  let feedbackService: FeedbackService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    (ClientsService as jest.Mock).mockImplementation(() => ({
      getClients: jest.fn().mockReturnValue(of([])),
    }));

    (FeedbackService as jest.Mock).mockImplementation(() => ({
      getFeedbacks: jest.fn().mockReturnValue(of([])),
    }));

    TestBed.configureTestingModule({
      providers: [ClientsStore, ClientsService, FeedbackService],
    });

    service = TestBed.inject(ClientsStore);
    clientsService = TestBed.inject(ClientsService);
    feedbackService = TestBed.inject(FeedbackService);
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

  describe('selector: feedbacks$', () => {
    it('should return null by default', () => {
      const observerSpy = subscribeSpyTo(service.feedbacks$);
      expect(observerSpy.getFirstValue()).toEqual(null);
    });
  });

  describe('effect: loadFeedbacks()', () => {
    it('should update clients state with stream from getFeedbacks()', () => {
      const testValue = ['123'];

      jest
        .spyOn(feedbackService, 'getFeedbacks')
        .mockReturnValue(of(testValue as any));

      const observerSpy = subscribeSpyTo(service.feedbacks$);

      service.loadFeedbacks();

      expect(observerSpy.getLastValue()).toBe(testValue);
    });

    it('should only trigger getFeedbacks() once', () => {
      service.loadFeedbacks();
      service.loadFeedbacks();

      expect(feedbackService.getFeedbacks).toHaveBeenCalledTimes(1);
    });
  });
});
