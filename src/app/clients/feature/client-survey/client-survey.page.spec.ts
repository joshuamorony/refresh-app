import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ClientsService } from '../../data-access/clients.service';
import { Client, ClientsStore } from '../../data-access/clients.store';
import { MockSurveyListComponent } from '../../ui/survey-list/survey-list.component.spec';

import { ClientSurveyPage } from './client-survey.page';

jest.mock('../../data-access/clients.service');

describe('ClientSurveyPage', () => {
  let component: ClientSurveyPage;
  let fixture: ComponentFixture<ClientSurveyPage>;

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
      declarations: [ClientSurveyPage, MockSurveyListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: testClient.id })),
            snapshot: convertToParamMap({ id: testClient.id }),
          },
        },
        ClientsService,
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    })
      .overrideComponent(ClientSurveyPage, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    TestBed.overrideProvider(ClientsStore, {
      useValue: {
        clients$: of([testClient]),
        loadClients: jest.fn(),
      },
    });

    fixture = TestBed.createComponent(ClientSurveyPage);
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
