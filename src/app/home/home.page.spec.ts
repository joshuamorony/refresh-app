import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { HomePage } from './home.page';
import { AuthService } from '../shared/data-access/auth.service';

jest.mock('../shared/data-access/auth.service');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();

      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule.forRoot()],
        providers: [
          AuthService,
          {
            provide: NavController,
            useValue: {
              navigateForward: jest.fn(),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login() should trigger authentication process with google', () => {
    const authService =
      fixture.debugElement.injector.get<AuthService>(AuthService);

    component.login();

    expect(authService.loginWithGoogle).toHaveBeenCalled();
  });

  it('login() should trigger navigation to clients route after authentication', fakeAsync(() => {
    const navCtrl =
      fixture.debugElement.injector.get<NavController>(NavController);

    component.login();

    tick();

    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/clients');
  }));
});
