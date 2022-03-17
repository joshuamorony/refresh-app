import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';
import { ClientsStore } from '../../data-access/clients.store';
import { MockClientListComponent } from '../../ui/client-list/client-list.component.spec';
import { ClientDashboardPage } from './client-dashboard.page';

describe('ClientDashboardPage', () => {
  let component: ClientDashboardPage;
  let fixture: ComponentFixture<ClientDashboardPage>;

  const mockClients$ = new ReplaySubject();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientDashboardPage, MockClientListComponent],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      })
        .overrideComponent(ClientDashboardPage, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useValue: {
          clients$: mockClients$.asObservable(),
          loadClients: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(ClientDashboardPage);
      component = fixture.componentInstance;
      mockClients$.next(null);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadClients() when initialised', () => {
    const clientsStore =
      fixture.debugElement.injector.get<ClientsStore>(ClientsStore);
    component.ngOnInit();
    expect(clientsStore.loadClients).toHaveBeenCalled();
  });

  describe('loading state', () => {
    it('should display loading template if clients$ emits null', () => {
      const loadingElement = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const clientList = fixture.debugElement.query(By.css('app-client-list'));

      const message = fixture.debugElement.query(
        By.css('[data-test="no-clients-message"]')
      );

      expect(loadingElement).toBeTruthy();
      expect(clientList).toBeFalsy();
      expect(message).toBeFalsy();
    });

    it('should display client-list if clients$ has emitted a value', () => {
      mockClients$.next([{}]);
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const clientList = fixture.debugElement.query(By.css('app-client-list'));

      const message = fixture.debugElement.query(
        By.css('[data-test="no-clients-message"]')
      );

      expect(loadingElement).toBeFalsy();
      expect(clientList).toBeTruthy();
      expect(message).toBeFalsy();
    });

    it('should display a message if clients$ emits empty array', () => {
      mockClients$.next([]);
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const clientList = fixture.debugElement.query(By.css('app-client-list'));

      const message = fixture.debugElement.query(
        By.css('[data-test="no-clients-message"]')
      );

      expect(loadingElement).toBeFalsy();
      expect(clientList).toBeTruthy();
      expect(message).toBeTruthy();
    });
  });
});
