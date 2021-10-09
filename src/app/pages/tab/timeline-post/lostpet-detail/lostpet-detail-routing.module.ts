import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpetDetailPage } from './lostpet-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LostpetDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpetDetailPageRoutingModule {}
