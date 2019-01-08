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
    startWith(new postActions.LoadPosts()),
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
}
