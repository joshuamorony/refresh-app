import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFeedbackDetailPageRoutingModule } from './client-feedback-detail-routing.module';

import { ClientFeedbackDetailPage } from './client-feedback-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientFeedbackDetailPageRoutingModule
  ],
  declarations: [ClientFeedbackDetailPage]
})
export class ClientFeedbackDetailPageModule {}
