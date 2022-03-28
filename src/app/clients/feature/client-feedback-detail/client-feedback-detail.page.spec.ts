import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { MockRenderJsonComponent } from '../../../shared/ui/render-json/render-json.component.spec';
import { FeedbackService } from '../../../shared/data-access/feedback.service';
import { ClientsStore, Feedback } from '../../data-access/clients.store';

import { ClientFeedbackDetailPage } from './client-feedback-detail.page';

jest.mock('../../../shared/data-access/feedback.service');

describe('ClientFeedbackDetailPage', () => {
  let component: ClientFeedbackDetailPage;
  let fixture: ComponentFixture<ClientFeedbackDetailPage>;

  const testFeedback: Feedback = {
    id: '123',
    response: 'test',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFeedbackDetailPage, MockRenderJsonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: testFeedback.id })),
          },
        },
        FeedbackService,
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    })
      .overrideComponent(ClientFeedbackDetailPage, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    TestBed.overrideProvider(ClientsStore, {
      useValue: {
        feedbacks$: of([testFeedback]),
        loadFeedbacks: jest.fn(),
      },
    });

    fixture = TestBed.createComponent(ClientFeedbackDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFeedbacks() when initialised', () => {
    const clientsStore =
      fixture.debugElement.injector.get<ClientsStore>(ClientsStore);
    component.ngOnInit();
    expect(clientsStore.loadFeedbacks).toHaveBeenCalled();
  });

  it('feedback$ should be a stream of the feedback matching the id param', () => {
    const observerSpy = subscribeSpyTo(component.feedback$);
    expect(observerSpy.getLastValue()).toEqual(testFeedback);
  });
});
