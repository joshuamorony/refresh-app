import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSurveyDetailPageRoutingModule } from './client-survey-detail-routing.module';

import { ClientSurveyDetailPage } from './client-survey-detail.page';
import { RenderJsonComponentModule } from '../../../shared/ui/render-json/render-json.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSurveyDetailPageRoutingModule,
    RenderJsonComponentModule,
  ],
  declarations: [ClientSurveyDetailPage],
})
export class ClientSurveyDetailPageModule {}
