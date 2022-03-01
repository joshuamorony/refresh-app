import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeStore } from '../data-access/home.store';

import { HomePage } from './home.page';

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
      }).compileComponents();

      TestBed.overrideProvider(HomeStore, {
        useValue: {
          login: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login()', () => {
    it('should trigger the login effect', () => {
      const homeStore = fixture.debugElement.injector.get<HomeStore>(HomeStore);

      component.login();
      expect(homeStore.login).toHaveBeenCalled();
    });
  });
});
