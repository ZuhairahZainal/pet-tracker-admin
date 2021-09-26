import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductPostPageRoutingModule } from './new-product-post-routing.module';

import { NewProductPostPage } from './new-product-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProductPostPageRoutingModule
  ],
  declarations: [NewProductPostPage]
})
export class NewProductPostPageModule {}
