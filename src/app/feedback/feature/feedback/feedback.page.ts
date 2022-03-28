import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { JsonFormData } from 'src/app/shared/ui/json-form/json-form.component';
import * as feedbackFormData from '../../../../assets/feedback-form.json';
import { FeedbackService } from '../../../shared/data-access/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPage {
  feedbackForm = new FormGroup({});
  feedbackFormData: JsonFormData = feedbackFormData;
  feedbackFormSubmitted$ = new BehaviorSubject<'success' | 'error'>(null);

  constructor(private feedbackService: FeedbackService) {}

  async save() {
    try {
      await this.feedbackService.saveFeedback(this.feedbackForm.value);
      this.feedbackFormSubmitted$.next('success');
    } catch (err) {
      this.feedbackFormSubmitted$.next('error');
    }
  }
}
