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

  describe('loginWithGoogle()', () => {
    it('should launch a sign in pop up window with google', () => {
      jest
        .spyOn(AngularFireAuth, 'signInWithPopup')
        .mockReturnValue(Promise.resolve(null));

      const observerSpy = subscribeSpyTo(service.loginWithGoogle());

      expect(AngularFireAuth.signInWithPopup).toHaveBeenCalledWith(
        auth,
        new AngularFireAuth.GoogleAuthProvider()
      );
    });

    it('should emit resolved value from signInWithPopup', fakeAsync(() => {
      const testValue = 'success';

      jest
        .spyOn(AngularFireAuth, 'signInWithPopup')
        .mockReturnValue(Promise.resolve(testValue as any));

      const observerSpy = subscribeSpyTo(service.loginWithGoogle());

      tick();

      expect(observerSpy.getLastValue()).toEqual(testValue);
    }));

    it('should error if signInWithPopup fails', fakeAsync(() => {
      jest
        .spyOn(AngularFireAuth, 'signInWithPopup')
        .mockReturnValue(Promise.reject());

      const observerSpy = subscribeSpyTo(service.loginWithGoogle(), {
        expectErrors: true,
      });

      tick();

      expect(observerSpy.receivedError()).toBe(true);
    }));

    it('should not call signInWithPopup if the user is already authenticated', () => {
      const testValue = 'success';

      const signInWithPopupSpy = jest.spyOn(AngularFireAuth, 'signInWithPopup');

      jest
        .spyOn(AngularFireAuth, 'authState')
        .mockReturnValue(of(testValue) as any);

      const observerSpy = subscribeSpyTo(service.loginWithGoogle());

      expect(signInWithPopupSpy).not.toHaveBeenCalled();
    });

    it('should emit value from authState if the user is already authenticated', () => {
      const testValue = 'success';

      jest
        .spyOn(AngularFireAuth, 'authState')
        .mockReturnValue(of(testValue) as any);

      const observerSpy = subscribeSpyTo(service.loginWithGoogle());

      expect(observerSpy.getLastValue()).toBe(testValue);
    });
  });

  describe('getLoggedIn()', () => {
    it('should emit a value when a user authenticates successfully', fakeAsync(() => {
      jest.spyOn(AngularFireAuth, 'authState').mockReturnValue(of({} as any));

      const observerSpy = subscribeSpyTo(service.getLoggedIn());

      tick();

      expect(observerSpy.getLastValue()).toBeTruthy();
    }));

    it('should emit a value null value if the user has not authenticated successfully', fakeAsync(() => {
      jest.spyOn(AngularFireAuth, 'authState').mockReturnValue(of(null));

      const observerSpy = subscribeSpyTo(service.getLoggedIn());

      tick();

      expect(observerSpy.getLastValue()).toBe(null);
    }));
  });
});
