import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import * as postActions from './post.actions';
import { PostService } from '../services/post.service';

@Injectable()
export class PostEffects {
  constructor(private postService: PostService, private action$: Actions) {}

  @Effect()
  loadPostsEffect$: Observable<Action> = this.action$.pipe(
    ofType<postActions.LoadPosts>(postActions.PostActionTypes.LoadPosts),
    switchMap(action =>
      this.postService
        .getPosts()
        .pipe(
          map(
            posts => new postActions.LoadPostsSuccess(posts),
            catchError(err => of(new postActions.LoadPostsFailure(err)))
          )
        )
    )
  );

  @Effect()
  updatePostEffect$: Observable<Action> = this.action$.pipe(
    ofType<postActions.UpdatePost>(postActions.PostActionTypes.UpdatePost),
    switchMap(action =>
      this.postService.updatePost(action.post).pipe(
        map(
          post =>
            new postActions.UpdatePostSuccess({
              id: post.id,
              changes: post
            }),
          catchError(error => of(new postActions.LoadPostsFailure(error)))
        )
      )
    )
  );
}
