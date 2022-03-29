import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Client } from '../../data-access/clients.store';

import { SurveyListComponent } from './survey-list.component';

@Component({
  selector: 'app-survey-list',
  template: '',
})
export class MockSurveyListComponent {
  @Input() surveys: Pick<Client, 'survey'>[];
}

describe('SurveyListComponent', () => {
  let component: SurveyListComponent;
  let fixture: ComponentFixture<SurveyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyListComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    })
      .overrideComponent(SurveyListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() surveys', () => {
    it('displays loading template if undefined', () => {
      component.surveys = undefined;
      fixture.detectChanges();

      const loading = fixture.debugElement.query(
        By.css('[data-test="survey-loading"]')
      );

      const list = fixture.debugElement.query(
        By.css('[data-test="survey-list"]')
      );

      expect(loading).toBeTruthy();
      expect(list).toBeFalsy();
    });

    it('displays a message if there are no surveys', () => {
      component.surveys = [];
      fixture.detectChanges();

      const message = fixture.debugElement.query(
        By.css('[data-test="no-surveys-message"]')
      );

      expect(message).toBeTruthy();
    });

    it('renders an item for each survey', () => {
      const testSurveys: any = [{}, {}];

      component.surveys = testSurveys as any;
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(
        By.css('[data-test="survey-list"] ion-item')
      );

      expect(items.length).toEqual(testSurveys.length);
    });
  });
});
