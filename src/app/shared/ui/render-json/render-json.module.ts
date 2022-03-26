import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenderJsonComponent } from './render-json.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [RenderJsonComponent],
  exports: [RenderJsonComponent]
})
export class RenderJsonComponentModule {}
