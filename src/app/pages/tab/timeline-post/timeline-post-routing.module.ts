import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelinePostPage } from './timeline-post.page';

const routes: Routes = [
  {
    path: '',
    component: TimelinePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePostPageRoutingModule {}
