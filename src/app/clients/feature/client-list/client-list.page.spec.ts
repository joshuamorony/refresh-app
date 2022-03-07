import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClientsStore } from '../../data-access/clients.store';

import { ClientListPage } from './client-list.page';

describe('ClientListPage', () => {
  let component: ClientListPage;
  let fixture: ComponentFixture<ClientListPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientListPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useValue: {
          loadClients: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(ClientListPage);
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
});
