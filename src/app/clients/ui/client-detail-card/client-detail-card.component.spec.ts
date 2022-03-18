import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Client } from '../../data-access/clients.store';

import { ClientDetailCardComponent } from './client-detail-card.component';

@Component({
  selector: 'app-client-detail-card',
  template: '',
})
export class MockClientDetailCardComponent {
  @Input() client: any;
}

describe('ClientDetailCardComponent', () => {
  let component: ClientDetailCardComponent;
  let fixture: ComponentFixture<ClientDetailCardComponent>;
  let testClient: Client;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientDetailCardComponent],
        imports: [IonicModule.forRoot()],
      })
        .overrideComponent(ClientDetailCardComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ClientDetailCardComponent);
      component = fixture.componentInstance;

      testClient = {
        name: {
          first: 'Josh',
          last: 'Morony',
        },
        email: 'joshua.morony@gmail.com',
        phone: '555',
        notes: '',
        survey: [],
        appointments: [],
      };

      component.client = testClient;

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() client', () => {
    it('displays loading template if undefined', () => {
      component.client = undefined;
      fixture.detectChanges();

      const loading = fixture.debugElement.query(
        By.css('[data-test="loading"]')
      );

      const display = fixture.debugElement.query(
        By.css('[data-test="client-name-display"]')
      );

      expect(loading).toBeTruthy();
      expect(display).toBeFalsy();
    });

    it('displays the clients name', () => {
      const nameDisplay = fixture.debugElement.query(
        By.css('[data-test="client-name-display"]')
      );

      expect(nameDisplay.nativeElement.textContent).toContain(
        `${testClient.name.first} ${testClient.name.last}`
      );
    });

    it('displays the clients email', () => {
      const emailDisplay = fixture.debugElement.query(
        By.css('[data-test="client-email-display"]')
      );

      expect(emailDisplay.nativeElement.textContent).toContain(
        `${testClient.email}`
      );
    });

    it('displays the clients phone', () => {
      const phoneDisplay = fixture.debugElement.query(
        By.css('[data-test="client-phone-display"]')
      );

      expect(phoneDisplay.nativeElement.textContent).toContain(
        `${testClient.phone}`
      );
    });

    it('displays the clients notes', () => {
      const notesDisplay = fixture.debugElement.query(
        By.css('[data-test="client-notes-display"]')
      );

      expect(notesDisplay.nativeElement.textContent).toContain(
        `${testClient.notes}`
      );
    });
  });
});
