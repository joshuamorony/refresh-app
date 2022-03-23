import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JsonFormComponent } from './json-form.component';
import { CheckboxComponentModule } from '../checkbox/checkbox.module';
import { CheckboxGroupComponentModule } from '../checkbox-group/checkbox-group.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CheckboxComponentModule,
    CheckboxGroupComponentModule,
  ],
  declarations: [JsonFormComponent],
  exports: [JsonFormComponent],
})
export class JsonFormComponentModule {}
