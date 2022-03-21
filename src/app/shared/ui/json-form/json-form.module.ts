import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JsonFormComponent } from './json-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [JsonFormComponent],
  exports: [JsonFormComponent],
})
export class JsonFormComponentModule {}
