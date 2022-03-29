import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent {
  @Input() surveys: string[];
}
