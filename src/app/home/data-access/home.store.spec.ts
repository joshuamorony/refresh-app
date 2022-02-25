import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';
import { AuthService } from '../../shared/data-access/auth.service';
import { HomeStore } from './home.store';

jest.mock('../../shared/data-access/auth.service');

describe('HomeStore', () => {
  let service: HomeStore;
  let authService: AuthService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [HomeStore, AuthService],
    });
    service = TestBed.inject(HomeStore);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login selector should initially return: pending', () => {
    const status$ = service.select((state) => state.loginStatus);

    const observerSpy = subscribeSpyTo(status$);

    expect(observerSpy.getFirstValue()).toBe('pending');
  });

  //   it('login effect should change state to authenticating once triggered', () => {
  //     const status$ = service.select((state) => state.loginStatus);
  //     const observerSpy = subscribeSpyTo(status$);

  //     service.login();

  //     expect(observerSpy.getLastValue()).toBe('authenticating');
  //   });

  //   it('login effect should change state to success once loginWithGoogle resolves', fakeAsync(() => {
  //     const status$ = service.select((state) => state.loginStatus);
  //     const observerSpy = subscribeSpyTo(status$);

  //     jest.spyOn(authService, 'loginWithGoogle').mockResolvedValue({} as any);

  //     service.login();

  //     tick();

  //     console.info(observerSpy.getValues());

  //     expect(observerSpy.getLastValue()).toBe('success');
  //   }));

  //   it('login effect should change state to error if getLoggedIn emits a null response', () => {
  //     const status$ = service.select((state) => state.loginStatus);
  //     const observerSpy = subscribeSpyTo(status$);

  //     (authService.getLoggedIn as jest.Mock).mockReturnValue(of(null));

  //     service.login();

  //     expect(observerSpy.getLastValue()).toBe('error');
  //   });

  //   it('login effect should change state to error if the observable stream errors', () => {});
});
