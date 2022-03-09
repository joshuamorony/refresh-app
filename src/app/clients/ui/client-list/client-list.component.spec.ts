import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Client } from '../../data-access/clients.store';

import { ClientListComponent } from './client-list.component';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientListComponent],
        imports: [IonicModule.forRoot()],
      })
        .overrideComponent(ClientListComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ClientListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() clients', () => {
    it('renders an item for each client', () => {
      const testClients: Partial<Client>[] = [
        {
          name: { first: 'Josh', last: 'Morony' },
        },
        {
          name: { first: 'Josh', last: 'Morony' },
        },
      ];

      component.clients = testClients as any;
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(
        By.css('[data-test="list"] ion-item')
      );

      expect(items.length).toEqual(testClients.length);
    });

    it('displays the first and last name of clients', () => {
      const testClient: Partial<Client>[] = [
        {
          name: { first: 'Josh', last: 'Morony' },
        },
      ];

      component.clients = testClient as any;
      fixture.detectChanges();

      const item = fixture.debugElement.query(
        By.css('[data-test="list"] ion-item')
      );

      expect(item.nativeElement.textContent).toBe(
        `${testClient[0].name.first} ${testClient[0].name.last}`
      );
    });
  });
});
