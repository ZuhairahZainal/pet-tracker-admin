import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpetDetailPageRoutingModule } from './lostpet-detail-routing.module';

import { LostpetDetailPage } from './lostpet-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpetDetailPageRoutingModule
  ],
  declarations: [LostpetDetailPage]
})
export class LostpetDetailPageModule {}
