import { ChangeDetectorRef, Component } from '@angular/core';
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
  value: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onChange = (value: string[]) => {};
  onTouch = () => {};

  // Allow Angular to set the value on the component
  writeValue(value: string[]): void {
    this.value = value || [];
    this.changeDetectorRef.markForCheck();
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  toggleValue(selectedValue: string) {
    const index = this.value.indexOf(selectedValue);

    if (index > -1) {
      this.value = [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ];
    } else {
      this.value = [...this.value, selectedValue];
    }

    this.onChange(this.value);
    this.onTouch();
  }

  isSelected(valueToCheck: string) {
    return this.value.includes(valueToCheck);
  }
}
