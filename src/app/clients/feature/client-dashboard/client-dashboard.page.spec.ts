import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ClientsStore } from '../../data-access/clients.store';
import { MockClientListComponent } from '../../ui/client-list/client-list.component.spec';
import { ClientDashboardPage } from './client-dashboard.page';

describe('ClientDashboardPage', () => {
  let component: ClientDashboardPage;
  let fixture: ComponentFixture<ClientDashboardPage>;

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
          clients$: of([]),
          loadClients: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(ClientDashboardPage);
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
