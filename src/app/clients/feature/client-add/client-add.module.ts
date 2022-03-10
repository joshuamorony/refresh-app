import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientAddPageRoutingModule } from './client-add-routing.module';

import { ClientAddPage } from './client-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientAddPageRoutingModule
  ],
  declarations: [ClientAddPage]
})
export class ClientAddPageModule {}
