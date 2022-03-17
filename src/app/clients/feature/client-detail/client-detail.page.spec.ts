import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of, ReplaySubject } from 'rxjs';
import { Client, ClientsStore } from '../../data-access/clients.store';
import { ClientDetailPage } from './client-detail.page';

describe('ClientDetailPage', () => {
  let component: ClientDetailPage;
  let fixture: ComponentFixture<ClientDetailPage>;

  const mockClients$ = new ReplaySubject();

  const testClient: Client = {
    id: '123',
    name: {
      first: 'Josh',
      last: 'Morony',
    },
    email: '',
    phone: '',
    notes: '',
    appointments: [],
    survey: [],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientDetailPage],
        imports: [IonicModule.forRoot(), RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap({ id: testClient.id })),
            },
          },
        ],
      })
        .overrideComponent(ClientDetailPage, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useValue: {
          clients$: mockClients$.asObservable(),
          loadClients: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(ClientDetailPage);
      component = fixture.componentInstance;
      mockClients$.next([testClient]);
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

  it('client$ should be a stream of the client matching the id param', () => {
    const observerSpy = subscribeSpyTo(component.client$);
    expect(observerSpy.getLastValue()).toEqual(testClient);
  });

  describe('loading state', () => {
    it('should display loading template if clients$ emits null', () => {
      mockClients$.next(null);
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const dataDisplay = fixture.debugElement.query(
        By.css('[data-test="client-name-display"]')
      );

      expect(loadingElement).toBeTruthy();
      expect(dataDisplay).toBeFalsy();
    });

    it('should display data if clients$ has emitted a value', () => {
      mockClients$.next([testClient]);
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const dataDisplay = fixture.debugElement.query(
        By.css('[data-test="client-name-display"]')
      );

      expect(loadingElement).toBeFalsy();
      expect(dataDisplay).toBeTruthy();
    });
  });
});
