import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ApiService } from '../../core/services/api.service';
import { Post } from '../models/post';
import * as fromPost from '../state';

@Injectable()
export class PostService {
  constructor(
    private apiService: ApiService,
    private store$: Store<fromPost.State>
  ) {}

  getPosts() {
    return this.apiService.getPosts().pipe(delay(1500)) as Observable<Post[]>;
  }

  updatePost(post: Post) {
    // Simulate 3% error rate on server by sending post with negative id
    const throwError = Math.random() > 0.97;
    return this.apiService
      .putPost(throwError ? { ...post, id: -1 } : post)
      .pipe(delay(500)) as Observable<Post>;
  }

  dispatchFavouritePostAction(post: Post) {
    this.store$.dispatch(new fromPost.PostActions.FavouritePost(post.id));
  }

  dispatchLoadPostAction() {
    this.store$.dispatch(new fromPost.PostActions.LoadPosts());
  }
}
