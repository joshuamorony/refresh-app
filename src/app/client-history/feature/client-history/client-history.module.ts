import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientHistoryPageRoutingModule } from './client-history-routing.module';

import { ClientHistoryPage } from './client-history.page';
import { JsonFormComponentModule } from '../../../shared/ui/json-form/json-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientHistoryPageRoutingModule,
    JsonFormComponentModule,
  ],
  declarations: [ClientHistoryPage],
})
export class ClientHistoryPageModule {}
