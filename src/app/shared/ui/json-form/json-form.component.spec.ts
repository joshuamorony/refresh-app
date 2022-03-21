import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { JsonFormComponent, JsonFormData } from './json-form.component';

describe('JsonFormComponent', () => {
  let component: JsonFormComponent;
  let fixture: ComponentFixture<JsonFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [JsonFormComponent],
        imports: [IonicModule.forRoot(), ReactiveFormsModule],
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

      const dateControl = fixture.debugElement.query(By.css('ion-datetime'));
      expect(dateControl).toBeTruthy();
    });

    it('can render a radio input', () => {
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

      const radioControl = fixture.debugElement.query(By.css('ion-radio'));
      expect(radioControl).toBeTruthy();
    });

    it('can render a checkbox input', () => {
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

      const checkboxControl = fixture.debugElement.query(
        By.css('ion-checkbox')
      );
      expect(checkboxControl).toBeTruthy();
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

      const rangeControl = fixture.debugElement.query(By.css('ion-range'));
      expect(rangeControl).toBeTruthy();
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

      const textareaControl = fixture.debugElement.query(
        By.css('ion-textarea')
      );
      expect(textareaControl).toBeTruthy();
    });

    it('can render groups of checkboxes and radio inputs', () => {
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

      const radioGroup = fixture.debugElement.query(By.css('ion-radio-group'));
      const radioItems = fixture.debugElement.queryAll(By.css('ion-radio'));

      const checkboxItems = fixture.debugElement.queryAll(
        By.css('ion-checkbox')
      );

      expect(radioGroup).toBeTruthy();
      expect(radioItems.length).toBe(2);
      expect(checkboxItems.length).toBe(2);
    });
  });
});
