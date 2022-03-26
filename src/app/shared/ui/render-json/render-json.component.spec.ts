import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { RenderJsonComponent } from './render-json.component';

@Component({
  selector: 'app-render-json',
  template: '',
})
export class MockRenderJsonComponent {
  @Input() json: any;
}

describe('RenderJsonComponent', () => {
  let component: RenderJsonComponent;
  let fixture: ComponentFixture<RenderJsonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RenderJsonComponent],
        imports: [IonicModule.forRoot()],
      })
        .overrideComponent(RenderJsonComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(RenderJsonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() json', () => {
    it('should render the key and value for each JSON entry', () => {
      const testJsonString =
        '{"propertyOne": "value1", "propertyTwo": "value2"}';

      component.json = testJsonString;
      fixture.detectChanges();

      const testJson = JSON.parse(testJsonString);

      const items = fixture.debugElement.queryAll(
        By.css('[data-test="json-entry-container"]')
      );

      const label = items[0].query(By.css('[data-test="json-key"]'));

      const value = items[0].query(By.css('[data-test="json-value"]'));

      expect(items.length).toEqual(Object.keys(testJson).length);
      expect(label.nativeElement.innerHTML).toContain(Object.keys(testJson)[0]);
      expect(value.nativeElement.value).toEqual(Object.values(testJson)[0]);
    });
  });
});
