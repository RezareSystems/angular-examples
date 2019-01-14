import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';

import { PostService } from '../services/post.service';
import * as fromPost from './';

@Injectable()
export class PostEffects {
  constructor(
    private postService: PostService,
    private action$: Actions,
    private store$: Store<fromPost.State>
  ) {}

  @Effect()
  loadPostsEffect$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.PostActions.LoadPosts>(
      fromPost.PostActions.PostActionTypes.LoadPosts
    ),
    switchMap(action =>
      this.postService.getPosts().pipe(
        map(posts => new fromPost.PostActions.LoadPostsSuccess(posts)),
        catchError(err => of(new fromPost.PostActions.LoadPostsFailure(err)))
      )
    )
  );

  @Effect()
  favouritePostEffect$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.PostActions.FavouritePost>(
      fromPost.PostActions.PostActionTypes.FavouritePost
    ),
    withLatestFrom(
      this.store$.pipe(select(fromPost.PostSelectors.getAllPostsSelector))
    ),
    mergeMap(([action, posts]) => {
      const post = posts.find(p => p.id === action.postId);

      return this.postService.updatePost({ ...post }).pipe(
        map(updatedPost => new fromPost.PostActions.FavouritePostSuccess()),
        catchError(error =>
          of(new fromPost.PostActions.FavouritePostFailure(post.id, error))
        )
      );
    })
  );
}
