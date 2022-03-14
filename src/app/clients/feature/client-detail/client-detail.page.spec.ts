import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Client, ClientsStore } from '../../data-access/clients.store';
import { ClientDetailPage } from './client-detail.page';

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
        declarations: [ClientDetailPage],
        imports: [IonicModule.forRoot(), RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of({
                get: (param: string) => testClient.id,
              }),
            },
          },
        ],
      }).compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useFactory: jest.fn().mockImplementation(() => ({
          clients$: of([testClient]),
        })),
      });

      fixture = TestBed.createComponent(ClientDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('client$ should be a stream of the client matching the id param', () => {
    const observerSpy = subscribeSpyTo(component.client$);
    expect(observerSpy.getLastValue()).toEqual(testClient);
  });
});
