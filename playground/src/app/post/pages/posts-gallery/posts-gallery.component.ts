import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Post } from '../../models/post';
import * as fromPost from '../../state';

@Component({
  selector: 'app-posts-gallery',
  templateUrl: './posts-gallery.component.html',
  styleUrls: ['./posts-gallery.component.scss']
})
export class PostsGalleryComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  constructor(private store$: Store<fromPost.State>) {}

  ngOnInit() {
    this.posts$ = this.store$.pipe(
      select(fromPost.PostSelectors.getAllPostsSelector)
    );
    this.loading$ = this.store$.pipe(
      select(fromPost.PostSelectors.getPostLoading)
    );
    this.store$.dispatch(new fromPost.PostActions.LoadPosts());
  }
}
