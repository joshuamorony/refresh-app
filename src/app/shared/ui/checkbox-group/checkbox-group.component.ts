import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxGroupComponent,
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  selectedValues: string[] = [];

  onChange = (selectedValues: string[]) => {};
  onTouch = () => {};

  // Allow Angular to set the value on the component
  writeValue(selectedValues: string[]): void {
    this.selectedValues = selectedValues;
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: (selectedValues: string[]) => void): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  toggleValue(value: string) {
    const index = this.selectedValues.indexOf(value);

    if (index > -1) {
      this.selectedValues = [
        ...this.selectedValues.slice(0, index),
        ...this.selectedValues.slice(index + 1),
      ];
    } else {
      this.selectedValues = [...this.selectedValues, value];
    }

    this.onChange(this.selectedValues);
    this.onTouch();
  }
}
