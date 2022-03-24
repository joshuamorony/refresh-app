import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { JsonFormData } from 'src/app/shared/ui/json-form/json-form.component';
import * as feedbackFormData from '../../../../assets/feedback-form.json';
import { FeedbackService } from '../../data-access/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPage {
  feedbackForm = new FormGroup({});
  feedbackFormData: JsonFormData = feedbackFormData;
  feedbackFormSubmitted$ = new BehaviorSubject<boolean>(null);

  constructor(private feedbackService: FeedbackService) {}

  save() {
    this.feedbackFormSubmitted$.next(true);
    this.feedbackService.saveFeedback(this.feedbackForm.value);
  }
}
