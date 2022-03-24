import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckboxComponent],
        imports: [IonicModule.forRoot()],
      })
        .overrideComponent(CheckboxComponent, {
          add: {
            providers: [
              {
                provide: CheckboxGroupComponent,
                useValue: {
                  isSelected: jest.fn(),
                  toggleValue: jest.fn(),
                },
              },
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(CheckboxComponent);
      component = fixture.componentInstance;

      component.value = 'testValue';
      component.label = 'testLabel';

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking item should call parent toggleValue with input value', () => {
    const componentGroup = fixture.debugElement.injector.get(
      CheckboxGroupComponent
    );

    const item = fixture.debugElement.query(By.css('ion-item'));
    item.nativeElement.click();
    expect(componentGroup.toggleValue).toHaveBeenCalledWith('testValue');
  });

  it('if isSelected returns true for value, checkbox state should be checked', () => {
    const componentGroup = fixture.debugElement.injector.get(
      CheckboxGroupComponent
    );

    jest.spyOn(componentGroup, 'isSelected').mockReturnValue(true);

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('ion-checkbox'));
    expect(checkbox.componentInstance.checked).toBe(true);
  });

  it('if isSelected returns false for value, checkbox state should not be checked', () => {
    const componentGroup = fixture.debugElement.injector.get(
      CheckboxGroupComponent
    );

    jest.spyOn(componentGroup, 'isSelected').mockReturnValue(false);

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('ion-checkbox'));
    expect(checkbox.componentInstance.checked).toBe(false);
  });

  it('should display label input in ion-label', () => {
    const label = fixture.debugElement.query(By.css('ion-label'));
    expect(label.nativeElement.innerHTML).toContain(component.label);
  });
});
