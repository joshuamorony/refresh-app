import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFeedbackPageRoutingModule } from './client-feedback-routing.module';

import { ClientFeedbackPage } from './client-feedback.page';
import { FeedbackListComponentModule } from '../../ui/feedback-list/feedback-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientFeedbackPageRoutingModule,
    FeedbackListComponentModule,
  ],
  declarations: [ClientFeedbackPage],
})
export class ClientFeedbackPageModule {}
