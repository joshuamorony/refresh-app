import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClientsStore } from '../../data-access/clients.store';

import { ClientListPage } from './client-list.page';

jest.doMock('../../data-access/clients.store');

describe('ClientListPage', () => {
  let component: ClientListPage;
  let fixture: ComponentFixture<ClientListPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientListPage],
        imports: [IonicModule.forRoot()],
        providers: [ClientsStore],
      }).compileComponents();

      fixture = TestBed.createComponent(ClientListPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
