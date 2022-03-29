import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '../../data-access/clients.store';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent {
  @Input() surveys: Pick<Client, 'survey'>[];
}
