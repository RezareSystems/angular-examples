import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Post } from '../models/post';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  LoadPostsSuccess = '[Post] Load Posts Success',
  LoadPostsFailure = '[Post] Load Posts Failure',
  UpdatePost = '[Post] Update Post',
  UpdatePostSuccess = '[Post] Update Post Success',
  UpdatePostFailure = '[Post] Update Post Failure'
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LoadPostsSuccess;
  constructor(public payload: Post[]) {}
}

export class LoadPostsFailure implements Action {
  readonly type = PostActionTypes.LoadPostsFailure;
  constructor(public payload: any) {}
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UpdatePost;
  constructor(public post: Post) {}
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActionTypes.UpdatePostSuccess;
  constructor(public postUpdate: Update<Post>) {}
}

export class UpdatePostFailure implements Action {
  readonly type = PostActionTypes.UpdatePostFailure;
  constructor(public error: any) {}
}

export type PostActions =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsFailure
  | UpdatePost
  | UpdatePostSuccess
  | UpdatePostFailure;
