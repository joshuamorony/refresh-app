import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckboxGroupComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckboxGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue()', () => {
    it('should update selectedValues', () => {
      const testSelectedValues = ['test1', 'test2'];

      component.writeValue(testSelectedValues);

      expect(component.selectedValues).toBe(testSelectedValues);
    });
  });

  describe('toggleValue()', () => {
    it('should add value to selectedValues if not already in the array', () => {
      const originalSelectedValues = [];
      component.selectedValues = originalSelectedValues;

      const testValue = 'test';

      component.toggleValue(testValue);

      expect(component.selectedValues).toEqual([
        ...originalSelectedValues,
        testValue,
      ]);
    });

    it('should remove value from selectedValues if already in the array', () => {
      const testValue = 'test';
      component.selectedValues = [testValue];

      component.toggleValue(testValue);

      expect(component.selectedValues.indexOf(testValue)).toBe(-1);
    });

    it('should pass selectedValues to onChange method', () => {
      jest.spyOn(component, 'onChange');

      const testValue = 'test';
      component.toggleValue(testValue);

      expect(component.onChange).toHaveBeenCalledWith(component.selectedValues);
    });

    it('should call the onTouch method', () => {
      jest.spyOn(component, 'onTouch');

      const testValue = 'test';
      component.toggleValue(testValue);

      expect(component.onTouch).toHaveBeenCalled();
    });
  });

  describe('isSelected()', () => {
    it('should return true if value is in selectedValues', () => {
      const testValue = 'test';
      component.selectedValues = [testValue];

      const result = component.isSelected(testValue);

      expect(result).toBe(true);
    });

    it('should return false if value is not selectedValues', () => {
      const testValue = 'test';
      component.selectedValues = [testValue];

      const result = component.isSelected('somethingelse');

      expect(result).toBe(false);
    });
  });
});
