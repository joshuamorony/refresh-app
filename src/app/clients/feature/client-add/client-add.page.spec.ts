import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, NavController } from '@ionic/angular';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { ClientsService } from '../../data-access/clients.service';
import { Client, ClientsStore } from '../../data-access/clients.store';
import { ClientEditorComponentModule } from '../../ui/client-editor/client-editor.module';

import { ClientAddPage } from './client-add.page';

jest.mock('../../data-access/clients.service');

describe('ClientAddPage', () => {
  let component: ClientAddPage;
  let fixture: ComponentFixture<ClientAddPage>;

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

  const mockParamMap = new ReplaySubject<ParamMap>();
  const mockParamMapSnapshot = new BehaviorSubject<ParamMap>(
    convertToParamMap({})
  );

  const mockFormGroup = new FormGroup({
    name: new FormGroup({
      first: new FormControl(),
      last: new FormControl(),
    }),
    email: new FormControl(),
    phone: new FormControl(),
    notes: new FormControl(),
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientAddPage],
        providers: [
          ClientsService,
          {
            provide: NavController,
            useValue: {
              navigateBack: jest.fn(),
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: mockParamMap.asObservable(),
              snapshot: {
                paramMap: mockParamMapSnapshot.value,
              },
            },
          },
        ],
        imports: [
          IonicModule.forRoot(),
          ClientEditorComponentModule,
          RouterTestingModule,
        ],
      })
        .overrideComponent(ClientAddPage, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useFactory: jest.fn().mockImplementation(() => ({
          clients$: of([testClient]),
        })),
      });

      fixture = TestBed.createComponent(ClientAddPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('adding client', () => {
    beforeEach(() => {
      const params = convertToParamMap({});

      mockParamMap.next(params);
      mockParamMapSnapshot.next(params);
      fixture.detectChanges();
    });

    it('should have a title of "Add Client"', () => {
      const title = fixture.debugElement.query(By.css('ion-title'));
      expect(title.nativeElement.innerHTML).toContain('Add Client');
    });

    it('should pass saved form values to addClient', () => {
      const clientsService =
        fixture.debugElement.injector.get<ClientsService>(ClientsService);

      const clientEditor = fixture.debugElement.query(
        By.css('app-client-editor')
      );

      component.clientForm$ = of(mockFormGroup);

      fixture.detectChanges();

      clientEditor.triggerEventHandler('save', null);

      expect(clientsService.addClient).toHaveBeenCalledWith(
        mockFormGroup.value
      );
    });

    it('client$ should emit null if no client id in route', () => {
      const observerSpy = subscribeSpyTo(component.client$);
      expect(observerSpy.getLastValue()).toBe(null);
    });
  });

  describe('editing client', () => {
    beforeEach(() => {
      const params = convertToParamMap({ id: testClient.id });

      mockParamMap.next(params);
      mockParamMapSnapshot.next(params);
      fixture.detectChanges();
    });

    it('should have a title of "Edit Client"', () => {
      const title = fixture.debugElement.query(By.css('ion-title'));
      expect(title.nativeElement.innerHTML).toContain('Edit Client');
    });

    it('should pass form values AND client id to updateClient', () => {
      const clientsService =
        fixture.debugElement.injector.get<ClientsService>(ClientsService);

      const clientEditor = fixture.debugElement.query(
        By.css('app-client-editor')
      );

      component.clientForm$ = of(mockFormGroup);

      fixture.detectChanges();

      clientEditor.triggerEventHandler('save', null);

      expect(clientsService.updateClient).toHaveBeenCalledWith({
        id: testClient.id,
        ...mockFormGroup.value,
      });
    });

    it('client$ should emit the client matching the id param if client id in route', () => {
      const observerSpy = subscribeSpyTo(component.client$);
      expect(observerSpy.getLastValue()).toEqual(testClient);
    });

    it('should initialise clientForm with the passed in client', () => {
      const observerSpy = subscribeSpyTo(component.clientForm$);

      expect(observerSpy.getLastValue().value).toEqual({
        name: {
          first: testClient.name.first,
          last: testClient.name.last,
        },
        email: testClient.email,
        phone: testClient.phone,
        notes: testClient.notes,
      });
    });
  });
});
