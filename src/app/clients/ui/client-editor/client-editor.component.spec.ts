import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { ClientEditorComponent } from './client-editor.component';

describe('ClientEditorComponent', () => {
  let component: ClientEditorComponent;
  let fixture: ComponentFixture<ClientEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientEditorComponent],
        imports: [IonicModule.forRoot(), ReactiveFormsModule],
      })
        .overrideComponent(ClientEditorComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ClientEditorComponent);
      component = fixture.componentInstance;

      component.formGroup = new FormGroup({
        name: new FormGroup({
          first: new FormControl(),
          last: new FormControl(),
        }),
        email: new FormControl(),
        phone: new FormControl(),
        notes: new FormControl(),
      });

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the form is submitted', () => {
    const observerSpy = subscribeSpyTo(component.save);

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(observerSpy.getValuesLength()).toEqual(1);
  });

  describe('@Input: formControl', () => {
    it('should be bound to first name input', () => {
      const testValue = '123';

      const input = fixture.debugElement.query(
        By.css(`[data-test="first-name-input"]`)
      );

      component.formGroup.get('name').get('first').setValue(testValue);
      expect(input.componentInstance.value).toBe(testValue);
    });

    it('should be bound to last name input', () => {
      const testValue = '123';

      const input = fixture.debugElement.query(
        By.css(`[data-test="last-name-input"]`)
      );

      component.formGroup.get('name').get('last').setValue(testValue);
      expect(input.componentInstance.value).toBe(testValue);
    });

    it('should be bound to email input', () => {
      const testValue = '123';

      const input = fixture.debugElement.query(
        By.css(`[data-test="email-input"]`)
      );

      component.formGroup.get('email').setValue(testValue);
      expect(input.componentInstance.value).toBe(testValue);
    });

    it('should be bound to phone input', () => {
      const testValue = '123';

      const input = fixture.debugElement.query(
        By.css(`[data-test="phone-input"]`)
      );

      component.formGroup.get('phone').setValue(testValue);
      expect(input.componentInstance.value).toBe(testValue);
    });

    it('should be bound to notes input', () => {
      const testValue = '123';

      const input = fixture.debugElement.query(
        By.css(`[data-test="notes-input"]`)
      );

      component.formGroup.get('notes').setValue(testValue);
      expect(input.componentInstance.value).toBe(testValue);
    });
  });
});
