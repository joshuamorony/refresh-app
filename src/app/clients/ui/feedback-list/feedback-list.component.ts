import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feedback } from '../../data-access/clients.store';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackListComponent {
  @Input() feedbacks: Feedback[];

  constructor() {}
}
