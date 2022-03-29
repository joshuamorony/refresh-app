import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonFormData } from '../../../shared/ui/json-form/json-form.component';

import * as surveyFormData from '../../../../assets/survey-form.json';
import { ClientsService } from '../../../clients/data-access/clients.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.page.html',
  styleUrls: ['./client-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHistoryPage {
  surveyForm = new FormGroup({});
  surveyFormData: JsonFormData = surveyFormData;
  surveyFormSubmitted$ = new BehaviorSubject<'success' | 'error'>(null);

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  async save() {
    try {
      await this.clientsService.saveSurvey(
        this.surveyForm.value,
        this.route.snapshot.paramMap.get('id')
      );
      this.surveyFormSubmitted$.next('success');
    } catch (err) {
      this.surveyFormSubmitted$.next('error');
    }
  }
}
