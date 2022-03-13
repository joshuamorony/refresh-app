import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientEditorComponent } from './client-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [ClientEditorComponent],
  exports: [ClientEditorComponent],
})
export class ClientEditorComponentModule {}
