import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDetailPageRoutingModule } from './edit-detail-routing.module';

import { EditDetailPage } from './edit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditDetailPageRoutingModule
  ],
  declarations: [EditDetailPage]
})
export class EditDetailPageModule {}
