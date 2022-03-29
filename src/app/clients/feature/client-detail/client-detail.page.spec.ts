import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { ClientsService } from '../../data-access/clients.service';
import { Client, ClientsStore } from '../../data-access/clients.store';
import { MockClientDetailCardComponent } from '../../ui/client-detail-card/client-detail-card.component.spec';
import { ClientDetailPage } from './client-detail.page';

jest.mock('../../data-access/clients.service');

describe('ClientDetailPage', () => {
  let component: ClientDetailPage;
  let fixture: ComponentFixture<ClientDetailPage>;

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailPage, MockClientDetailCardComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: testClient.id })),
            snapshot: convertToParamMap({ id: testClient.id }),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateBack: jest.fn(),
          },
        },
        {
          provide: AlertController,
          useValue: {
            create: jest.fn().mockResolvedValue({
              present: jest.fn(),
            }),
          },
        },
        ClientsService,
      ],
    })
      .overrideComponent(ClientDetailPage, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    TestBed.overrideProvider(ClientsStore, {
      useValue: {
        clients$: of([testClient]),
        loadClients: jest.fn(),
      },
    });

    fixture = TestBed.createComponent(ClientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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

  describe('deleteClient()', () => {
    it('should NOT call the removeClient method', () => {
      const clientsService = fixture.debugElement.injector.get(ClientsService);

      jest.spyOn(clientsService, 'removeClient');

      component.deleteClient(testClient);

      expect(clientsService.removeClient).not.toHaveBeenCalled();
    });

    it('should NOT navigate back to the clients page', () => {
      const navCtrl = fixture.debugElement.injector.get(NavController);
      component.deleteClient(testClient);
      expect(navCtrl.navigateBack).not.toHaveBeenCalled();
    });

    it('the confirm handler for the alert should pass the clients id to the removeClient method', () => {
      const clientsService = fixture.debugElement.injector.get(ClientsService);
      const alertCtrl = fixture.debugElement.injector.get(AlertController);

      jest.spyOn(clientsService, 'removeClient');

      component.deleteClient(testClient);

      const alertOptions = (alertCtrl.create as jest.Mock).mock.calls[0];

      const confirmHandler = alertOptions[0].buttons.find(
        (button) => button.text === 'Delete'
      ).handler;

      confirmHandler();

      expect(clientsService.removeClient).toHaveBeenCalledWith(testClient.id);
    });

    it('the confirm handler for the alert should trigger a navigation back to the clients route', () => {
      const navCtrl = fixture.debugElement.injector.get(NavController);
      const alertCtrl = fixture.debugElement.injector.get(AlertController);

      component.deleteClient(testClient);

      const alertOptions = (alertCtrl.create as jest.Mock).mock.calls[0];

      const confirmHandler = alertOptions[0].buttons.find(
        (button) => button.text === 'Delete'
      ).handler;

      confirmHandler();

      expect(navCtrl.navigateBack).toHaveBeenCalledWith('/clients');
    });
  });
});
