import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostRoutingModule } from './post-routing.module';
import { PostsGalleryComponent } from './pages/posts-gallery/posts-gallery.component';
import { PostCardComponent } from './pages/posts-gallery/post-card/post-card.component';
import { PostService } from './services/post.service';
import { postReducer } from './state/post.reducer';
import { PostEffects } from './state/post.effects';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [PostsGalleryComponent, PostCardComponent],
  providers: [PostService, PostEffects]
})
export class PostModule {}
