import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  items?: any[];
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value?: string;
  type: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input() formData: JsonFormData;
  @Input() formGroup: FormGroup;

  @Output() save = new EventEmitter<boolean>();

  constructor() {}

  ngOnChanges() {
    this.createForm();
  }

  createForm() {
    for (const control of this.formData.controls) {
      this.formGroup.addControl(control.name, new FormControl(control.value));
    }
  }
}
