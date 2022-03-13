import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ClientEditorComponentModule } from '../../ui/client-editor/client-editor.module';

import { ClientAddPage } from './client-add.page';

describe('ClientAddPage', () => {
  let component: ClientAddPage;
  let fixture: ComponentFixture<ClientAddPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientAddPage],
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
});
