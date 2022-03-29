import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockJsonFormComponent } from '../../../shared/ui/json-form/json-form.component.spec';
import { ClientsService } from '../../../clients/data-access/clients.service';

import { ClientHistoryPage } from './client-history.page';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

jest.mock('../../../clients/data-access/clients.service');

describe('ClientHistoryPage', () => {
  let component: ClientHistoryPage;
  let fixture: ComponentFixture<ClientHistoryPage>;

  const testClientId = 'abc123';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientHistoryPage, MockJsonFormComponent],
      providers: [
        ClientsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: testClientId }),
            },
          },
        },
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    })
      .overrideComponent(ClientHistoryPage, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ClientHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when the survey form emits the save event, the saveSurvey method should be triggered', () => {
    const clientsService = fixture.debugElement.injector.get(ClientsService);

    const surveyForm = fixture.debugElement.query(
      By.css('[data-test="survey-form"]')
    );

    surveyForm.triggerEventHandler('save', null);

    expect(clientsService.saveSurvey).toHaveBeenCalledWith(
      component.surveyForm.value,
      testClientId
    );
  });

  it('should display an error message if saveSurvey throws error', async () => {
    const clientsService = fixture.debugElement.injector.get(ClientsService);
    jest.spyOn(clientsService, 'saveSurvey').mockRejectedValue('error');

    await component.save();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="error-message"]')
    );
    const successMessage = fixture.debugElement.query(
      By.css('[data-test="thankyou-message"]')
    );

    expect(errorMessage).toBeTruthy();
    expect(successMessage).toBeFalsy();
  });
});
