import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ClientsStore } from '../../data-access/clients.store';
import { MockFeedbackListComponent } from '../../ui/feedback-list/feedback-list.component.spec';
import { ClientFeedbackPage } from './client-feedback.page';

describe('ClientFeedbackPage', () => {
  let component: ClientFeedbackPage;
  let fixture: ComponentFixture<ClientFeedbackPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientFeedbackPage, MockFeedbackListComponent],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      })
        .overrideComponent(ClientFeedbackPage, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      TestBed.overrideProvider(ClientsStore, {
        useValue: {
          feedbacks$: of([]),
          loadFeedbacks: jest.fn(),
        },
      });

      fixture = TestBed.createComponent(ClientFeedbackPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFeedbacks() when initialised', () => {
    const clientsStore =
      fixture.debugElement.injector.get<ClientsStore>(ClientsStore);
    component.ngOnInit();
    expect(clientsStore.loadFeedbacks).toHaveBeenCalled();
  });
});
