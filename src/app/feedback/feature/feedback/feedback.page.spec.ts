import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { MockJsonFormComponent } from '../../../shared/ui/json-form/json-form.component.spec';
import { FeedbackService } from '../../../shared/data-access/feedback.service';

import { FeedbackPage } from './feedback.page';

jest.mock('../../../shared/data-access/feedback.service');

describe('FeedbackPage', () => {
  let component: FeedbackPage;
  let fixture: ComponentFixture<FeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackPage, MockJsonFormComponent],
      providers: [FeedbackService],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when the feedback form emits the save event, the saveFeedback method should be triggered', () => {
    const feedbackService = fixture.debugElement.injector.get(FeedbackService);

    const feedbackForm = fixture.debugElement.query(
      By.css('[data-test="feedback-form"]')
    );

    feedbackForm.triggerEventHandler('save', null);

    expect(feedbackService.saveFeedback).toHaveBeenCalledWith(
      component.feedbackForm.value
    );
  });

  it('should display an error message if saveFeedback throws error', async () => {
    const feedbackService = fixture.debugElement.injector.get(FeedbackService);
    jest.spyOn(feedbackService, 'saveFeedback').mockRejectedValue('error');

    await component.save();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="error-message"]')
    );
    const successMessage = fixture.debugElement.query(
      By.css('[data-test="thankyou-message"]')
    );

    expect(errorMessage).toBeTruthy();
    expect(successMessage).toBeFalsy();
  });
});
