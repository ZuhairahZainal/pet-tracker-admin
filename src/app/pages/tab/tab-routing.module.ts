import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children:[
      {
        path: 'timeline-post',
        loadChildren: () => import('./timeline-post/timeline-post.module').then( m => m.TimelinePostPageModule)
      },
      {
        path: 'new-product-post',
        loadChildren: () => import('./new-product-post/new-product-post.module').then( m => m.NewProductPostPageModule)
      },
      {
        path: 'adoption-post',
        loadChildren: () => import('./adoption-post/adoption-post.module').then( m => m.AdoptionPostPageModule)
      },
      {
        path: 'user-account',
        loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule)
      },
      {
        path: 'user-report',
        loadChildren: () => import('./user-report/user-report.module').then( m => m.UserReportPageModule)
      }
    ]
  },
  {
    path: 'vet',
    loadChildren: () => import('./vet/vet.module').then( m => m.VetPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
