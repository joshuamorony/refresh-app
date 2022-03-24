import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { CheckboxGroupComponentModule } from '../checkbox-group/checkbox-group.module';
import { CheckboxComponentModule } from '../checkbox/checkbox.module';

import { JsonFormComponent, JsonFormData } from './json-form.component';

@Component({
  selector: 'app-json-form',
  template: '',
})
export class MockJsonFormComponent {
  @Input() formData: any;
  @Input() formGroup: any;
  @Output() save = new EventEmitter<boolean>();
}

describe('JsonFormComponent', () => {
  let component: JsonFormComponent;
  let fixture: ComponentFixture<JsonFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [JsonFormComponent],
        imports: [
          IonicModule.forRoot(),
          ReactiveFormsModule,
          CheckboxComponentModule,
          CheckboxGroupComponentModule,
        ],
      })
        .overrideComponent(JsonFormComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(JsonFormComponent);
      component = fixture.componentInstance;
      component.formData = { controls: [] };
      component.formGroup = new FormGroup({});
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('field rendering', () => {
    it('can render a date field', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'date',
            label: 'Date',
            type: 'date',
            validators: {
              required: true,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      // Should render
      const dateControl = fixture.debugElement.query(By.css('ion-datetime'));
      expect(dateControl).toBeTruthy();

      // Should be bound to control
      const testValue = '123';
      component.formGroup
        .get(testFormData.controls[0].name)
        .setValue(testValue);
      expect(dateControl.componentInstance.value).toBe(testValue);
    });

    it('can render a range input', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'range',
            label: 'Range',
            value: '5',
            type: 'range',
            options: {
              min: '1',
              max: '10',
              step: '1',
              icon: 'bed-outline',
            },
            validators: {},
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      // Should render
      const rangeControl = fixture.debugElement.query(By.css('ion-range'));
      expect(rangeControl).toBeTruthy();

      // Should be bound to control
      const testValue = '123';
      component.formGroup
        .get(testFormData.controls[0].name)
        .setValue(testValue);
      expect(rangeControl.componentInstance.value).toBe(testValue);
    });

    it('can render a textarea', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            type: 'textarea',
            validators: {},
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      // Should render
      const textareaControl = fixture.debugElement.query(
        By.css('ion-textarea')
      );
      expect(textareaControl).toBeTruthy();

      // Should be bound to control
      const testValue = '123';
      component.formGroup
        .get(testFormData.controls[0].name)
        .setValue(testValue);
      expect(textareaControl.componentInstance.value).toBe(testValue);
    });

    it('can render groups of radio inputs', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'radio',
            label: 'Radio',
            type: 'radio',
            options: {
              items: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            validators: {},
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const radioGroup = fixture.debugElement.query(By.css('ion-radio-group'));
      const radioItems = fixture.debugElement.queryAll(By.css('ion-radio'));

      expect(radioGroup).toBeTruthy();
      expect(radioItems.length).toBe(2);

      // Should be bound to control
      const testValue = 'yes';
      component.formGroup
        .get(testFormData.controls[0].name)
        .setValue(testValue);
      expect(radioGroup.componentInstance.value).toBe(testValue);
    });

    it('can render groups of checkboxes', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'checkbox',
            label: 'Checkbox',
            type: 'checkbox',
            options: {
              items: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            validators: {},
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const checkboxGroup = fixture.debugElement.query(
        By.css('app-checkbox-group')
      );
      const checkboxItems = fixture.debugElement.queryAll(
        By.css('app-checkbox')
      );

      // Should render
      expect(checkboxGroup).toBeTruthy();
      expect(checkboxItems.length).toBe(2);

      // Should be bound to control
      const testValue = ['yes'];
      component.formGroup
        .get(testFormData.controls[0].name)
        .setValue(testValue);

      expect(checkboxGroup.componentInstance.value).toBe(testValue);
    });
  });

  describe('submission and validation', () => {
    it('should emit an event when the form is submitted', () => {
      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(1);
    });

    it('should not emit for validation error: min', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '4',
            type: 'textarea',
            validators: {
              min: 5,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: max', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '4',
            type: 'textarea',
            validators: {
              max: 3,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: required', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '',
            type: 'textarea',
            validators: {
              required: true,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: requiredTrue', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: 'a value that is not true',
            type: 'textarea',
            validators: {
              requiredTrue: true,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: email', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '123',
            type: 'textarea',
            validators: {
              email: true,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: minLength', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '123',
            type: 'textarea',
            validators: {
              minLength: 5,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: maxLength', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '123',
            type: 'textarea',
            validators: {
              maxLength: 2,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should not emit for validation error: pattern', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '123',
            type: 'textarea',
            validators: {
              pattern: '[a-zA-Z ]*',
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(0);
    });

    it('should display an error message after failed submission', () => {
      const testFormData: JsonFormData = {
        controls: [
          {
            name: 'textarea',
            label: 'Textarea',
            value: '123',
            type: 'textarea',
            validators: {
              email: true,
            },
          },
        ],
      };

      component.formData = testFormData;
      component.ngOnChanges();
      fixture.detectChanges();

      const beforeSubmission = fixture.debugElement.query(
        By.css('[data-test="form-error-message"]')
      );

      const form = fixture.debugElement.query(By.css('form'));

      // Manually trigger submit since ion-button won't work with "submit" in tests
      form.nativeElement.submit();

      fixture.detectChanges();

      const afterSubmission = fixture.debugElement.query(
        By.css('[data-test="form-error-message"]')
      );

      expect(beforeSubmission).toBeFalsy();
      expect(afterSubmission).toBeTruthy();
    });
  });
});
