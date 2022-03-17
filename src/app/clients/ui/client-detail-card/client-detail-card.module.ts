import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDetailCardComponent } from './client-detail-card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [ClientDetailCardComponent],
  exports: [ClientDetailCardComponent]
})
export class ClientDetailCardComponentModule {}
