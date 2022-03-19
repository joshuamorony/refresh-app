import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, NavController } from '@ionic/angular';
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientDetailPage, MockClientDetailCardComponent],
        imports: [IonicModule.forRoot(), RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap({ id: testClient.id })),
            },
          },
          {
            provide: NavController,
            useValue: {
              navigateBack: jest.fn(),
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

  describe('deleteClient()', () => {
    it('should pass the client being deleted to the client service', () => {
      const clientsService = fixture.debugElement.injector.get(ClientsService);

      jest.spyOn(clientsService, 'removeClient');

      component.deleteClient(testClient);

      expect(clientsService.removeClient).toHaveBeenCalledWith(testClient.id);
    });

    it('should navigate back to the clients page', () => {
      const navCtrl = fixture.debugElement.injector.get(NavController);
      component.deleteClient(testClient);
      expect(navCtrl.navigateBack).toHaveBeenCalledWith('/clients');
    });
  });
});
