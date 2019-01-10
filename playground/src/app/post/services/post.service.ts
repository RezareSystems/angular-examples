import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
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
    return this.apiService.getPosts().pipe(delay(3000)) as Observable<Post[]>;
  }

  updatePost(post: Post) {
    return this.apiService.putPost(post) as Observable<Post>;
  }

  dispatchFavouritePostAction(post: Post) {
    const copyPost = {
      ...post,
      favourite: !post.favourite
    };
    this.store$.dispatch(new fromPost.PostActions.UpdatePost(copyPost));
  }

  dispatchLoadPostAction() {
    this.store$.dispatch(new fromPost.PostActions.LoadPosts());
  }
}
