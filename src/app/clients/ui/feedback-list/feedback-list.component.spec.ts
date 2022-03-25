import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Feedback } from '../../data-access/clients.store';

import { FeedbackListComponent } from './feedback-list.component';

@Component({
  selector: 'app-feedback-list',
  template: '',
})
export class MockFeedbackListComponent {
  @Input() feedbacks: Feedback[];
}

describe('FeedbackListComponent', () => {
  let component: FeedbackListComponent;
  let fixture: ComponentFixture<FeedbackListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FeedbackListComponent],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      })
        .overrideComponent(FeedbackListComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(FeedbackListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() feedbacks', () => {
    it('displays loading template if undefined', () => {
      component.feedbacks = undefined;
      fixture.detectChanges();

      const loading = fixture.debugElement.query(
        By.css('[data-test="feedback-loading"]')
      );

      const list = fixture.debugElement.query(
        By.css('[data-test="feedback-list"]')
      );

      expect(loading).toBeTruthy();
      expect(list).toBeFalsy();
    });

    it('displays a message if there are no feedbacks', () => {
      component.feedbacks = [];
      fixture.detectChanges();

      const message = fixture.debugElement.query(
        By.css('[data-test="no-feedbacks-message"]')
      );

      expect(message).toBeTruthy();
    });

    it('renders an item for each feedback', () => {
      const testFeedbacks: any = [{}, {}];

      component.feedbacks = testFeedbacks as any;
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(
        By.css('[data-test="feedback-list"] ion-item')
      );

      expect(items.length).toEqual(testFeedbacks.length);
    });
  });
});
