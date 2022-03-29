import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { MockRenderJsonComponent } from '../../../shared/ui/render-json/render-json.component.spec';
import { Client, ClientsStore } from '../../data-access/clients.store';

import { ClientSurveyDetailPage } from './client-survey-detail.page';

describe('ClientSurveyDetailPage', () => {
  let component: ClientSurveyDetailPage;
  let fixture: ComponentFixture<ClientSurveyDetailPage>;

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
    survey: ['{}'],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSurveyDetailPage, MockRenderJsonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: testClient.id, index: 0 })),
            snapshot: {
              paramMap: convertToParamMap({ id: testClient.id, index: 0 }),
            },
          },
        },
      ],
      imports: [IonicModule.forRoot()],
    })
      .overrideComponent(ClientSurveyDetailPage, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    TestBed.overrideProvider(ClientsStore, {
      useValue: {
        clients$: of([testClient]),
        loadClients: jest.fn(),
      },
    });

    fixture = TestBed.createComponent(ClientSurveyDetailPage);
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
});
