import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptionPostPage } from './adoption-post.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionPostPage
  },
  {
    path: 'more-info/:id',
    loadChildren: () => import('./more-info/more-info.module').then( m => m.MoreInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionPostPageRoutingModule {}
