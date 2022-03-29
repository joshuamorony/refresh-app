import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-survey',
  templateUrl: './client-survey.page.html',
  styleUrls: ['./client-survey.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSurveyPage {}
