import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { JsonFormComponentModule } from '../../../shared/ui/json-form/json-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    JsonFormComponentModule,
  ],
  declarations: [FeedbackPage],
})
export class FeedbackPageModule {}
