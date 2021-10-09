import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelinePostPage } from './timeline-post.page';

const routes: Routes = [
  {
    path: '',
    component: TimelinePostPage
  },
  {
    path: 'feed-detail/:id',
    loadChildren: () => import('./feed-detail/feed-detail.module').then( m => m.FeedDetailPageModule)
  },
  {
    path: 'lostpet-detail/:id',
    loadChildren: () => import('./lostpet-detail/lostpet-detail.module').then( m => m.LostpetDetailPageModule)
  },
  {
    path: 'donation-detail/:id',
    loadChildren: () => import('./donation-detail/donation-detail.module').then( m => m.DonationDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePostPageRoutingModule {}
