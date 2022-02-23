import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { AuthService } from './auth.service';
import * as AngularFireAuth from '@angular/fire/auth';
import { of } from 'rxjs';

jest.mock('@angular/fire/auth');

describe('AuthService', () => {
  let service: AuthService;
  let auth: AngularFireAuth.Auth;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [AngularFireAuth.Auth],
    });
    service = TestBed.inject(AuthService);
    auth = TestBed.inject(AngularFireAuth.Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loginWithGoogle() should launch a sign in pop up window with google', () => {
    jest.spyOn(AngularFireAuth, 'signInWithPopup');

    service.loginWithGoogle();

    expect(AngularFireAuth.signInWithPopup).toHaveBeenCalledWith(
      auth,
      new AngularFireAuth.GoogleAuthProvider()
    );
  });

  it('getLoggedIn() should emit a value when a user authenticates successfully', fakeAsync(() => {
    jest.spyOn(AngularFireAuth, 'authState').mockReturnValue(of({} as any));

    const observerSpy = subscribeSpyTo(service.getLoggedIn());

    tick();

    expect(observerSpy.getLastValue()).toBeTruthy();
  }));

  it('getLoggedIn() should not emit a value if the user has not authenticated successfully', fakeAsync(() => {
    jest.spyOn(AngularFireAuth, 'authState').mockReturnValue(of(null));

    const observerSpy = subscribeSpyTo(service.getLoggedIn());

    tick();

    expect(observerSpy.getValuesLength()).toEqual(0);
  }));
});
