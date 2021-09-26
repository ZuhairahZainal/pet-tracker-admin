import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProductPostPage } from './new-product-post.page';

const routes: Routes = [
  {
    path: '',
    component: NewProductPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProductPostPageRoutingModule {}
