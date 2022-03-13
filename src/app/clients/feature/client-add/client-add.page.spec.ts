import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ClientsService } from '../../data-access/clients.service';
import { ClientEditorComponentModule } from '../../ui/client-editor/client-editor.module';

import { ClientAddPage } from './client-add.page';

jest.mock('../../data-access/clients.service');

describe('ClientAddPage', () => {
  let component: ClientAddPage;
  let fixture: ComponentFixture<ClientAddPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientAddPage],
        providers: [
          ClientsService,
          {
            provide: NavController,
            useValue: {
              navigateBack: jest.fn(),
            },
          },
        ],
        imports: [
          IonicModule.forRoot(),
          ClientEditorComponentModule,
          RouterTestingModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ClientAddPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass form values to the client service when submitted', () => {
    const clientsService =
      fixture.debugElement.injector.get<ClientsService>(ClientsService);

    const clientEditor = fixture.debugElement.query(
      By.css('app-client-editor')
    );

    clientEditor.triggerEventHandler('save', null);

    expect(clientsService.addClient).toHaveBeenCalledWith(
      component.clientForm.value
    );
  });
});
