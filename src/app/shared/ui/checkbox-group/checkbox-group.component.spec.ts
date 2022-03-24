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
    it('should update value', () => {
      const testValue = ['test1', 'test2'];

      component.writeValue(testValue);

      expect(component.value).toBe(testValue);
    });
  });

  describe('toggleValue()', () => {
    it('should add value to value if not already in the array', () => {
      const originalValue = [];
      component.value = originalValue;

      const testValue = 'test';

      component.toggleValue(testValue);

      expect(component.value).toEqual([...originalValue, testValue]);
    });

    it('should remove value from value if already in the array', () => {
      const testValue = 'test';
      component.value = [testValue];

      component.toggleValue(testValue);

      expect(component.value.indexOf(testValue)).toBe(-1);
    });

    it('should pass value to onChange method', () => {
      jest.spyOn(component, 'onChange');

      const testValue = 'test';
      component.toggleValue(testValue);

      expect(component.onChange).toHaveBeenCalledWith(component.value);
    });

    it('should call the onTouch method', () => {
      jest.spyOn(component, 'onTouch');

      const testValue = 'test';
      component.toggleValue(testValue);

      expect(component.onTouch).toHaveBeenCalled();
    });
  });

  describe('isSelected()', () => {
    it('should return true if value is in value', () => {
      const testValue = 'test';
      component.value = [testValue];

      const result = component.isSelected(testValue);

      expect(result).toBe(true);
    });

    it('should return false if value is not value', () => {
      const testValue = 'test';
      component.value = [testValue];

      const result = component.isSelected('somethingelse');

      expect(result).toBe(false);
    });
  });
});
