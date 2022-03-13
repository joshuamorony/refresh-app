import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditorComponent {
  @Input() formGroup: FormGroup;
  @Output() save = new EventEmitter<boolean>();

  constructor() {}
}
