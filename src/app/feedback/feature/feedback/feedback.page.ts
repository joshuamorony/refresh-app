import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonFormData } from 'src/app/shared/ui/json-form/json-form.component';
import * as feedbackFormData from '../../../../assets/feedback-form.json';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPage {
  feedbackForm = new FormGroup({});
  feedbackFormData: JsonFormData = feedbackFormData;

  constructor() {}
}
