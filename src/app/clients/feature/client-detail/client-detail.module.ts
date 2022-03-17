import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDetailPageRoutingModule } from './client-detail-routing.module';

import { ClientDetailPage } from './client-detail.page';
import { ClientDetailCardComponentModule } from '../../ui/client-detail-card/client-detail-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDetailPageRoutingModule,
    ClientDetailCardComponentModule,
  ],
  declarations: [ClientDetailPage],
})
export class ClientDetailPageModule {}
