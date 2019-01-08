import { Action } from '@ngrx/store';
import { Post } from '../models/post';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  LoadPostsSuccess = '[Post] Load Posts Success',
  LoadPostsFailure = '[Post] Load Posts Failure'
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

export type PostActions = LoadPosts | LoadPostsSuccess | LoadPostsFailure;
