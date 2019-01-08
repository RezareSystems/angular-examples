import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsGalleryComponent } from './pages/posts-gallery/posts-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: PostsGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
