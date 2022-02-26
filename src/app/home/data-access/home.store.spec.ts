import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../shared/data-access/auth.service';
import { HomeStore } from './home.store';

jest.mock('../../shared/data-access/auth.service');

describe('HomeStore', () => {
  let service: HomeStore;
  let authService: AuthService;
  let navCtrl: NavController;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        HomeStore,
        AuthService,
        {
          provide: NavController,
          useValue: {
            navigateForward: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(HomeStore);
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selector: loginStatus$', () => {
    it('should initially return: pending', () => {
      const observerSpy = subscribeSpyTo(service.loginStatus$);
      expect(observerSpy.getFirstValue()).toBe('pending');
    });
  });

  describe('effect: login', () => {
    it('should change state to authenticating once triggered', () => {
      const status$ = service.select((state) => state.loginStatus);
      const observerSpy = subscribeSpyTo(status$);

      service.login();

      expect(observerSpy.getValueAt(1)).toBe('authenticating');
    });

    it('should change state to success once loginWithGoogle emits', () => {
      const status$ = service.select((state) => state.loginStatus);
      const observerSpy = subscribeSpyTo(status$);

      jest.spyOn(authService, 'loginWithGoogle').mockReturnValue(of({} as any));

      service.login();

      expect(observerSpy.getLastValue()).toBe('success');
    });

    it('should change state to error if loginWithGoogle errors', () => {
      const status$ = service.select((state) => state.loginStatus);
      const observerSpy = subscribeSpyTo(status$);

      jest
        .spyOn(authService, 'loginWithGoogle')
        .mockReturnValue(throwError('fail'));

      service.login();

      expect(observerSpy.getLastValue()).toBe('error');
    });

    it('should navigate to clients route once loginWithGoogle emits', () => {
      jest.spyOn(authService, 'loginWithGoogle').mockReturnValue(of({} as any));

      service.login();

      expect(navCtrl.navigateForward).toHaveBeenCalledWith('/clients');
    });
  });
});
