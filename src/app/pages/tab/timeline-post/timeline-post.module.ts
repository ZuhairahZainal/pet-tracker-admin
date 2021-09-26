import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelinePostPageRoutingModule } from './timeline-post-routing.module';

import { TimelinePostPage } from './timeline-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelinePostPageRoutingModule
  ],
  declarations: [TimelinePostPage]
})
export class TimelinePostPageModule {}
