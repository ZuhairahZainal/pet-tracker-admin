import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage
  },
  {
    path: 'user-account',
    loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule)
  },
  {
    path: 'adoption-post',
    loadChildren: () => import('./adoption-post/adoption-post.module').then( m => m.AdoptionPostPageModule)
  },
  {
    path: 'new-product-post',
    loadChildren: () => import('./new-product-post/new-product-post.module').then( m => m.NewProductPostPageModule)
  },
  {
    path: 'timeline-post',
    loadChildren: () => import('./timeline-post/timeline-post.module').then( m => m.TimelinePostPageModule)
  },
  {
    path: 'user-report',
    loadChildren: () => import('./user-report/user-report.module').then( m => m.UserReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
