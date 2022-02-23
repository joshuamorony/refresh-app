import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

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
        providers: [AuthService],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger authentication process with google', () => {
    const authService =
      fixture.debugElement.injector.get<AuthService>(AuthService);

    component.login();

    expect(authService.loginWithGoogle).toHaveBeenCalled();
  });
});
