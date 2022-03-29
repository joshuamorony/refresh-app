import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-survey-detail',
  templateUrl: './client-survey-detail.page.html',
  styleUrls: ['./client-survey-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSurveyDetailPage {}
