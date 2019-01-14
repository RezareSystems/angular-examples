import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

import { Post } from '../../models/post';
import * as fromPost from '../../state';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-gallery',
  templateUrl: './posts-gallery.component.html',
  styleUrls: ['./posts-gallery.component.scss']
})
export class PostsGalleryComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(
    private store$: Store<fromPost.State>,
    private postService: PostService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.posts$ = this.store$.pipe(
      select(fromPost.PostSelectors.getAllPostsSelector)
    );
    this.loading$ = this.store$.pipe(
      select(fromPost.PostSelectors.getPostLoading)
    );

    this.subscriptions.push(
      this.store$
        .pipe(
          select(fromPost.PostSelectors.getPostError),
          filter(error => error != null)
        )
        .subscribe(error => {
          console.log('sadfsafas', error);
          this.toastrService.error(
            'Error updating post on the server',
            'Error'
          );
        })
    );

    this.postService.dispatchLoadPostAction();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCardClick(post: Post) {
    this.postService.dispatchFavouritePostAction(post);
  }
}
