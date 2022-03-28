import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonFormData } from '../../../shared/ui/json-form/json-form.component';

import * as surveyFormData from '../../../../assets/survey-form.json';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.page.html',
  styleUrls: ['./client-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHistoryPage {
  surveyForm = new FormGroup({});
  surveyFormData: JsonFormData = surveyFormData;

  constructor(private route: ActivatedRoute) {}

  save() {}
}
