import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientAddPageRoutingModule } from './client-add-routing.module';

import { ClientAddPage } from './client-add.page';
import { ClientEditorComponentModule } from '../../ui/client-editor/client-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientAddPageRoutingModule,
    ClientEditorComponentModule,
  ],
  declarations: [ClientAddPage],
})
export class ClientAddPageModule {}
