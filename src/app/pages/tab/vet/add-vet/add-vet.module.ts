import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVetPageRoutingModule } from './add-vet-routing.module';

import { AddVetPage } from './add-vet.page';

import { FileSizePipe } from '../../../../pipe/file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddVetPageRoutingModule
  ],
  declarations: [FileSizePipe ,AddVetPage]
})
export class AddVetPageModule {}
